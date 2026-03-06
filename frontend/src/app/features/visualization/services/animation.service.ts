import { Injectable, signal } from '@angular/core';

export interface Orb {
  id: number;
  value: number;
  height: number;
  state: 'idle' | 'comparing' | 'swapping' | 'sorted';
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  orbs = signal<Orb[]>([]);
  isRunning = signal<boolean>(false);
  isSorted = signal<boolean>(false);

  speedMs = signal<number>(50);

  comparisons = signal<number>(0);
  interchanges = signal<number>(0);

  private stopFlag = false;
  private isPaused = false;

  // The custom delay function that traps execution when paused
  private async delay() {
    await new Promise(resolve => setTimeout(resolve, this.speedMs()));

    // Trap the loop here if the user clicked Pause
    while (this.isPaused) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  generateArray(size: number) {
    this.stopFlag = true;
    this.isPaused = false;
    this.isRunning.set(false);
    this.isSorted.set(false);
    this.comparisons.set(0);
    this.interchanges.set(0);

    const newOrbs: Orb[] = [];
    for (let i = 0; i < size; i++) {
      const val = Math.floor(Math.random() * 100) + 5;
      newOrbs.push({ id: i, value: val, height: Math.min((val / 105) * 100, 100), state: 'idle' });
    }
    this.orbs.set(newOrbs);
  }

  setSpeed(ms: number) {
    this.speedMs.set(ms);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  stop() {
    this.stopFlag = true;
    this.isPaused = false; // Release the trap so the loop can exit cleanly
    this.isRunning.set(false);
  }

  private markAllSorted(arr: Orb[]) {
    if (!this.stopFlag) {
      arr.forEach(o => o.state = 'sorted');
      this.orbs.set([...arr]);
      this.isSorted.set(true);
    }
    this.isRunning.set(false);
  }

  // --- 1. BUBBLE SORT ---
  async runBubbleSort() {
    this.stopFlag = false; this.isPaused = false; this.isRunning.set(true); this.isSorted.set(false);
    this.comparisons.set(0); this.interchanges.set(0);
    let arr = [...this.orbs()];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (this.stopFlag) return;
        arr[j].state = 'comparing'; arr[j + 1].state = 'comparing';
        this.orbs.set([...arr]); await this.delay();

        this.comparisons.update(c => c + 1);

        if (arr[j].value > arr[j + 1].value) {
          arr[j].state = 'swapping'; arr[j + 1].state = 'swapping';
          this.orbs.set([...arr]); await this.delay();

          this.interchanges.update(v => v + 1);
          let temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
          this.orbs.set([...arr]);
        }
        arr[j].state = 'idle'; arr[j + 1].state = 'idle';
      }
      arr[n - i - 1].state = 'sorted';
    }
    arr[0].state = 'sorted';
    this.orbs.set([...arr]);
    if (!this.stopFlag) this.isSorted.set(true);
    this.isRunning.set(false);
  }

  // --- 2. SELECTION SORT ---
  async runSelectionSort() {
    this.stopFlag = false; this.isPaused = false; this.isRunning.set(true); this.isSorted.set(false);
    this.comparisons.set(0); this.interchanges.set(0);
    let arr = [...this.orbs()];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      arr[i].state = 'comparing'; this.orbs.set([...arr]);

      for (let j = i + 1; j < n; j++) {
        if (this.stopFlag) return;
        arr[j].state = 'comparing'; this.orbs.set([...arr]); await this.delay();

        this.comparisons.update(c => c + 1);

        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].state = 'idle';
          minIdx = j;
          arr[minIdx].state = 'swapping';
        } else {
          arr[j].state = 'idle';
        }
        this.orbs.set([...arr]);
      }
      if (minIdx !== i) {
        this.interchanges.update(v => v + 1);
        let temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
      }
      arr[i].state = 'sorted';
      if (minIdx !== i) arr[minIdx].state = 'idle';
      this.orbs.set([...arr]);
    }
    arr[n - 1].state = 'sorted';
    this.orbs.set([...arr]);
    if (!this.stopFlag) this.isSorted.set(true);
    this.isRunning.set(false);
  }

  // --- 3. INSERTION SORT ---
  async runInsertionSort() {
    this.stopFlag = false; this.isPaused = false; this.isRunning.set(true); this.isSorted.set(false);
    this.comparisons.set(0); this.interchanges.set(0);
    let arr = [...this.orbs()];
    let n = arr.length;
    arr[0].state = 'sorted'; this.orbs.set([...arr]);

    for (let i = 1; i < n; i++) {
      let j = i;
      while (j > 0) {
        if (this.stopFlag) return;
        arr[j].state = 'comparing'; arr[j - 1].state = 'comparing';
        this.orbs.set([...arr]); await this.delay();

        this.comparisons.update(c => c + 1);

        if (arr[j].value < arr[j - 1].value) {
          arr[j].state = 'swapping'; arr[j - 1].state = 'swapping';
          this.orbs.set([...arr]); await this.delay();

          this.interchanges.update(v => v + 1);
          let temp = arr[j]; arr[j] = arr[j - 1]; arr[j - 1] = temp;
          arr[j].state = 'sorted'; arr[j - 1].state = 'sorted';
          this.orbs.set([...arr]);
          j--;
        } else {
          arr[j].state = 'sorted'; arr[j - 1].state = 'sorted';
          this.orbs.set([...arr]); break;
        }
      }
    }
    this.markAllSorted(arr);
  }

  // --- 4. MERGE SORT ---
  async runMergeSort() {
    this.stopFlag = false; this.isPaused = false; this.isRunning.set(true); this.isSorted.set(false);
    this.comparisons.set(0); this.interchanges.set(0);
    let arr = [...this.orbs()];
    await this.mergeSortHelper(arr, 0, arr.length - 1);
    this.markAllSorted(arr);
  }

  private async mergeSortHelper(arr: Orb[], l: number, r: number) {
    if (l < r) {
      let m = Math.floor(l + (r - l) / 2);
      await this.mergeSortHelper(arr, l, m); if (this.stopFlag) return;
      await this.mergeSortHelper(arr, m + 1, r); if (this.stopFlag) return;
      await this.merge(arr, l, m, r);
    }
  }

  private async merge(arr: Orb[], start: number, mid: number, end: number) {
    let start2 = mid + 1;
    if (arr[mid].value <= arr[start2].value) return;

    while (start <= mid && start2 <= end) {
      if (this.stopFlag) return;
      arr[start].state = 'comparing'; arr[start2].state = 'comparing';
      this.orbs.set([...arr]); await this.delay();

      this.comparisons.update(c => c + 1);

      if (arr[start].value <= arr[start2].value) {
        arr[start].state = 'idle'; arr[start2].state = 'idle';
        start++;
      } else {
        let value = arr[start2]; let index = start2;
        arr[start2].state = 'swapping'; this.orbs.set([...arr]); await this.delay();

        while (index !== start) {
          arr[index] = arr[index - 1];
          this.interchanges.update(v => v + 1);
          index--;
        }
        arr[start] = value;
        arr[start].state = 'idle'; this.orbs.set([...arr]);
        start++; mid++; start2++;
      }
    }
  }

  // --- 5. QUICK SORT ---
  async runQuickSort() {
    this.stopFlag = false; this.isPaused = false; this.isRunning.set(true); this.isSorted.set(false);
    this.comparisons.set(0); this.interchanges.set(0);
    let arr = [...this.orbs()];
    await this.quickSortHelper(arr, 0, arr.length - 1);
    this.markAllSorted(arr);
  }

  private async quickSortHelper(arr: Orb[], low: number, high: number) {
    if (low < high) {
      let pi = await this.partition(arr, low, high);
      if (this.stopFlag) return;
      await this.quickSortHelper(arr, low, pi - 1);
      await this.quickSortHelper(arr, pi + 1, high);
    } else if (low === high && low >= 0 && low < arr.length) {
      arr[low].state = 'sorted'; this.orbs.set([...arr]);
    }
  }

  private async partition(arr: Orb[], low: number, high: number): Promise<number> {
    let pivot = arr[high].value;
    arr[high].state = 'comparing';
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (this.stopFlag) return -1;
      arr[j].state = 'comparing'; this.orbs.set([...arr]); await this.delay();

      this.comparisons.update(c => c + 1);

      if (arr[j].value <= pivot) {
        i++;
        if (i !== j) {
          arr[i].state = 'swapping'; arr[j].state = 'swapping';
          this.orbs.set([...arr]); await this.delay();
          this.interchanges.update(v => v + 1);
          let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
        arr[i].state = 'idle';
      }
      arr[j].state = 'idle'; this.orbs.set([...arr]);
    }
    if (i + 1 !== high) {
      arr[i + 1].state = 'swapping'; arr[high].state = 'swapping';
      this.orbs.set([...arr]); await this.delay();
      this.interchanges.update(v => v + 1);
      let temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    }
    arr[i + 1].state = 'sorted'; arr[high].state = 'idle';
    this.orbs.set([...arr]);
    return i + 1;
  }

  // --- 6. HEAP SORT ---
  async runHeapSort() {
    this.stopFlag = false; this.isPaused = false; this.isRunning.set(true); this.isSorted.set(false);
    this.comparisons.set(0); this.interchanges.set(0);
    let arr = [...this.orbs()];
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(arr, n, i); if (this.stopFlag) return;
    }
    for (let i = n - 1; i > 0; i--) {
      if (this.stopFlag) return;
      arr[0].state = 'swapping'; arr[i].state = 'swapping';
      this.orbs.set([...arr]); await this.delay();
      this.interchanges.update(v => v + 1);
      let temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
      arr[i].state = 'sorted'; arr[0].state = 'idle';
      this.orbs.set([...arr]);
      await this.heapify(arr, i, 0);
    }
    arr[0].state = 'sorted'; this.orbs.set([...arr]);
    if (!this.stopFlag) this.isSorted.set(true);
    this.isRunning.set(false);
  }

  private async heapify(arr: Orb[], n: number, i: number) {
    if (this.stopFlag) return;
    let largest = i; let l = 2 * i + 1; let r = 2 * i + 2;

    if (l < n) {
      arr[l].state = 'comparing'; arr[largest].state = 'comparing';
      this.orbs.set([...arr]); await this.delay();
      this.comparisons.update(c => c + 1);
      if (arr[l].value > arr[largest].value) largest = l;
      arr[l].state = 'idle'; arr[largest].state = 'idle';
    }
    if (r < n) {
      arr[r].state = 'comparing'; arr[largest].state = 'comparing';
      this.orbs.set([...arr]); await this.delay();
      this.comparisons.update(c => c + 1);
      if (arr[r].value > arr[largest].value) largest = r;
      arr[r].state = 'idle'; arr[largest].state = 'idle';
    }
    if (largest !== i) {
      arr[i].state = 'swapping'; arr[largest].state = 'swapping';
      this.orbs.set([...arr]); await this.delay();
      this.interchanges.update(v => v + 1);
      let temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
      arr[i].state = 'idle'; arr[largest].state = 'idle';
      this.orbs.set([...arr]);
      await this.heapify(arr, n, largest);
    }
  }
}

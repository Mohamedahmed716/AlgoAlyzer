import { Component, OnInit, inject } from '@angular/core';
import { AnimationService } from './services/animation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualization.html',
  styleUrls: ['./visualization.css']
})
export class VisualizationComponent implements OnInit {
  public animService = inject(AnimationService);
  Math = Math;

  selectedAlgo: string = 'Bubble Sort';
  arraySize: number = 25;
  isPaused: boolean = false;

  ngOnInit() {
    this.animService.generateArray(this.arraySize);
    this.animService.setSpeed(280);
  }

  updateSize() {
    if (this.arraySize < 5) this.arraySize = 5;
    if (this.arraySize > 100) this.arraySize = 100;

    if (!this.animService.isRunning()) {
      this.animService.generateArray(this.arraySize);
      this.isPaused = false;
    }
  }

  startSort() {
    if (this.animService.isRunning() && !this.isPaused) return;

    this.isPaused = false;

    switch (this.selectedAlgo) {
      case 'Bubble Sort': this.animService.runBubbleSort(); break;
      case 'Selection Sort': this.animService.runSelectionSort(); break;
      case 'Insertion Sort': this.animService.runInsertionSort(); break;
      case 'Merge Sort': this.animService.runMergeSort(); break;
      case 'Quick Sort': this.animService.runQuickSort(); break;
      case 'Heap Sort': this.animService.runHeapSort(); break;
      default: this.animService.runBubbleSort();
    }
  }

  pauseSort() {
    this.isPaused = true;
    if (typeof (this.animService as any).pause === 'function') {
      (this.animService as any).pause();
    }
  }

  resumeSort() {
    this.isPaused = false;
    if (typeof (this.animService as any).resume === 'function') {
      (this.animService as any).resume();
    }
  }

  reset() {
    this.isPaused = false;
    if (typeof this.animService.stop === 'function') {
      this.animService.stop();
    }
    this.animService.generateArray(this.arraySize);
  }

  updateSpeed(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    const delay = Math.max(5, Math.floor(1000 - ((val - 1) * 10.05)));
    this.animService.setSpeed(delay);
  }

  // --- SVG TREE VISUALIZATION LOGIC ---

  getOrbColor(state: string): string {
    if (state === 'sorted') return '#10b981';
    if (state === 'swapping') return '#ec4899';
    if (state === 'comparing') return '#3b82f6';
    return '#6366f1';
  }

  getHeapNodes() {
    const orbs = this.animService.orbs();
    const size = orbs.length;
    const maxLevel = Math.floor(Math.log2(size > 0 ? size : 1));

    return orbs.map((orb, i) => {
      const level = Math.floor(Math.log2(i + 1));
      const nodesInLevel = Math.pow(2, level);
      const pos = i - (nodesInLevel - 1);

      return {
        ...orb,
        cx: ((pos + 0.5) / nodesInLevel) * 100,
        cy: ((level + 1) / (maxLevel + 2)) * 100
      };
    });
  }

  getHeapLines() {
    const nodes = this.getHeapNodes();
    const lines = [];

    for (let i = 0; i < nodes.length; i++) {
      const leftChild = 2 * i + 1;
      const rightChild = 2 * i + 2;

      if (leftChild < nodes.length) {
        lines.push({
          x1: nodes[i].cx, y1: nodes[i].cy,
          x2: nodes[leftChild].cx, y2: nodes[leftChild].cy,
          active: nodes[i].state !== 'idle' || nodes[leftChild].state !== 'idle'
        });
      }
      if (rightChild < nodes.length) {
        lines.push({
          x1: nodes[i].cx, y1: nodes[i].cy,
          x2: nodes[rightChild].cx, y2: nodes[rightChild].cy,
          active: nodes[i].state !== 'idle' || nodes[rightChild].state !== 'idle'
        });
      }
    }
    return lines;
  }

  getMergeBlocks() {
    const bounds = this.animService.activeMergeBounds();
    const size = this.arraySize;
    if (!bounds) return [];

    const widthPercent = ((bounds.r - bounds.l + 1) / size) * 100;
    const leftPercent = (bounds.l / size) * 100;
    const midPercent = ((bounds.m - bounds.l + 1) / (bounds.r - bounds.l + 1)) * 100;

    return [{
      depth: bounds.depth,
      left: leftPercent,
      width: widthPercent,
      midSplit: midPercent
    }];
  }
}

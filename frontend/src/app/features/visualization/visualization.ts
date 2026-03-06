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
    // Tells the service to trap the loop in place
    if (typeof (this.animService as any).pause === 'function') {
      (this.animService as any).pause();
    }
  }

  resumeSort() {
    this.isPaused = false;
    // Tells the service to release the trap and continue
    if (typeof (this.animService as any).resume === 'function') {
      (this.animService as any).resume();
    }
  }

  reset() {
    this.isPaused = false;
    // Tells the service to kill the loop completely
    if (typeof this.animService.stop === 'function') {
      this.animService.stop();
    }
    this.animService.generateArray(this.arraySize);
  }

  updateSpeed(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    // Linear speed: 1000ms at slowest, 5ms at fastest
    const delay = Math.max(5, Math.floor(1000 - ((val - 1) * 10.05)));
    this.animService.setSpeed(delay);
  }
}

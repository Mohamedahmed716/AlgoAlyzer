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

  ngOnInit() {
    this.animService.generateArray(this.arraySize);
    this.animService.setSpeed(280);
  }

  updateSize() {
    if (this.arraySize < 5) this.arraySize = 5;
    if (this.arraySize > 100) this.arraySize = 100;

    if (!this.animService.isRunning()) {
      this.animService.generateArray(this.arraySize);
    }
  }

  startSort() {
    if (this.animService.isRunning()) return;

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

  reset() {
    this.animService.generateArray(this.arraySize);
  }

  updateSpeed(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    const maxDelay = 1000;
    const minDelay = 5;
    const delay = Math.floor(maxDelay * Math.pow((minDelay / maxDelay), (val - 1) / 99));

    this.animService.setSpeed(delay);
  }
}

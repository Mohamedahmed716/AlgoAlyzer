import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgorithmApiService } from '../../services/algorithm-api.service';
import { AppStateService } from '../../services/app-state.service';
import { SortRequest } from '../../models/sort-request.model';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  private apiService = inject(AlgorithmApiService);
  public appState = inject(AppStateService);

  modes = { random: true, sorted: false, inverselySorted: false };
  algorithms = { selection: true, insertion: true, bubble: false, merge: true, heap: true, quick: true };
  arraySizesInput: string = '100, 1000, 10000';

  /**
   * Handles incoming data from the FileUploadComponent.
   * Logic updated to support multiple files by merging data.
   */
  handleFile(event: { filename: string, data: number[] }) {
    if (event.data && event.data.length > 0) {
      // 1. Parse current values in the input box
      const existingNumbers = this.arraySizesInput
        .split(',')
        .map(s => parseInt(s.trim(), 10))
        .filter(n => !isNaN(n));

      // 2. Combine existing values with the new data from the file
      const combinedNumbers = [...existingNumbers, ...event.data];

      // 3. Remove duplicates and sort for a clean list
      const uniqueSortedNumbers = Array.from(new Set(combinedNumbers)).sort((a, b) => a - b);

      // 4. Update the UI string
      this.arraySizesInput = uniqueSortedNumbers.join(', ');
    }
  }

  runAnalysis() {
    this.appState.isLoading.set(true);

    const request: SortRequest = {
      generationModes: [],
      arraySizes: this.arraySizesInput.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)),
      algorithms: []
    };

    if (this.modes.random) request.generationModes.push('Random');
    if (this.modes.sorted) request.generationModes.push('Sorted');
    if (this.modes.inverselySorted) request.generationModes.push('Inversely Sorted');

    if (this.algorithms.selection) request.algorithms.push('Selection Sort');
    if (this.algorithms.insertion) request.algorithms.push('Insertion Sort');
    if (this.algorithms.bubble) request.algorithms.push('Bubble Sort');
    if (this.algorithms.merge) request.algorithms.push('Merge Sort');
    if (this.algorithms.heap) request.algorithms.push('Heap Sort');
    if (this.algorithms.quick) request.algorithms.push('Quick Sort');

    this.apiService.runComparison(request).subscribe({
      next: (results) => {
        this.appState.searchResults.set(results);
        this.appState.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching sorting data', err);
        this.appState.isLoading.set(false);
      }
    });
  }
}

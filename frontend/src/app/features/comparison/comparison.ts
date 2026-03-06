import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../core/services/app-state.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './comparison.html',
  styleUrls: ['./comparison.css']
})
export class ComparisonComponent {
  public appState = inject(AppStateService);

  fastestAlgo = computed(() => {
    const results = this.appState.searchResults();
    if (results.length === 0) return { name: '-', time: '0ms' };
    const fastest = results.reduce((prev, current) => (prev.avgRuntime < current.avgRuntime) ? prev : current);
    return { name: fastest.algorithmName, time: `${fastest.avgRuntime.toFixed(2)}ms` };
  });

  mostComplexAlgo = computed(() => {
    const results = this.appState.searchResults();
    if (results.length === 0) return { name: '-', comps: '0' };
    const mostComplex = results.reduce((prev, current) => (prev.comparisons > current.comparisons) ? prev : current);

    let formattedComps = mostComplex.comparisons.toString();
    if (mostComplex.comparisons > 1000000) {
      formattedComps = (mostComplex.comparisons / 1000000).toFixed(1) + 'M';
    } else if (mostComplex.comparisons > 1000) {
      formattedComps = (mostComplex.comparisons / 1000).toFixed(1) + 'k';
    }
    return { name: mostComplex.algorithmName, comps: formattedComps };
  });

  uniqueDatasets = computed(() => {
    const results = this.appState.searchResults();
    if (results.length === 0) return 'None';
    const modes = new Set(results.map(r => r.mode));
    return modes.size > 1 ? 'Multiple' : Array.from(modes)[0];
  });

  exportCsv(): void {
    const results = this.appState.searchResults();

    if (results.length === 0) {
      alert('No data to export. Please run an analysis first.');
      return;
    }

    // UPDATED: Added Min and Max Runtime to headers
    const headers = [
      'Algorithm Name',
      'Array Size',
      'Mode',
      'Runs',
      'Avg Runtime (ms)',
      'Min Runtime (ms)',
      'Max Runtime (ms)',
      'Comparisons',
      'Interchanges'
    ];
    const csvRows = [headers.join(',')];

    for (const row of results) {
      // UPDATED: Included row.minRuntime and row.maxRuntime in the export loop
      const values = [
        row.algorithmName,
        row.arraySize,
        row.mode,
        row.runs,
        row.avgRuntime.toFixed(4),
        row.minRuntime.toFixed(4),
        row.maxRuntime.toFixed(4),
        row.comparisons,
        row.interchanges
      ];
      csvRows.push(values.join(','));
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');

    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'algo_analyzer_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

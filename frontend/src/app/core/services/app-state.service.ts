import { Injectable, signal } from '@angular/core';
import { SortResult } from '../models/sort-result.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Signals to hold our global app data
  public searchResults = signal<SortResult[]>([]);
  public isLoading = signal<boolean>(false);
}

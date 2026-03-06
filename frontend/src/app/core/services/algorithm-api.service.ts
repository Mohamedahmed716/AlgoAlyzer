import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortRequest } from '../models/sort-request.model';
import { SortResult } from '../models/sort-result.model';

@Injectable({
  providedIn: 'root' //Singelton Pattern
})
export class AlgorithmApiService {
  private apiUrl = 'http://localhost:8080/api/v1/sort';

  constructor(private http: HttpClient) {}

  runComparison(request: SortRequest): Observable<SortResult[]> {
    return this.http.post<SortResult[]>(`${this.apiUrl}/compare`, request);
  }
}

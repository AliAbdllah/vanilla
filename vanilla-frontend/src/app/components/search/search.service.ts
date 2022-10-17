import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { UtilitiesService } from '../../service/utilities.service';

export interface SearchResult {
  title: string;
  description: string;
  link: any[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private _apiService: ApiService,
    private _utilities: UtilitiesService
  ) {}
  public search(query: string, start = 0): Observable<SearchResult[]> {
    const params = this._utilities.queryStringlify({
      searchQuery: query,
      start: start,
    });
    return this._apiService.get<any>('searches', params).pipe(
      map((response) => {
        return response;
      })
    );
  }
}

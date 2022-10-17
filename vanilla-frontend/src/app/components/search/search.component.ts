import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchQuery: FormControl = new FormControl('');
  searchResult: SearchResult[] = [];
  searchWaitTime = 500;
  start = 0;
  @Output()
  public eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.searchQuery.valueChanges
      .pipe(debounceTime(this.searchWaitTime))
      .subscribe((newVal) => {
        this.onSearchChange(newVal);
      });
  }

  onSearchChange(newVal: string): void {
    if (newVal) {
      this.searchService
        .search(newVal || this.searchQuery.value, this.start)
        .subscribe((val) => {
          if (!newVal) {
            if (!this.searchResult) {
              this.searchResult = [];
            }
            this.searchResult.push(...val);
          }
          this.searchResult = val;
        });
    }
  }

  reset(): void {
    this.start = 0;
    this.searchResult = [];
    this.searchQuery.reset();
    this.closeSearch();
  }

  loadMore(): void {
    this.start += 10;
    this.onSearchChange(null);
  }

  closeSearch() {
    this.eventEmitter.emit(true);
  }
}

export interface SearchResult {
  title: string;
  description: string;
  link: any;
}

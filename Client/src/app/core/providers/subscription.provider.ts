//Vendors
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsProvider {
  private searchSubject$: Subject<string>;

  constructor() {
    this.searchSubject$ = new Subject();
    this.setSearchSubscription();
  }


  searchNext(inputValue: string): void {
    this.searchSubject$.next(inputValue);
  }

  setSearchSubscription(): Observable<string> {
    return this.searchSubject$.pipe(
      debounceTime(600),
      map(emittedValue => emittedValue.trim()),
      distinctUntilChanged()
    );
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public searchInput$ = new Subject();
  public container$ = new Subject();
  public data: Array<{ id: number; name: string; image: string}> = [
    { id: 1, name: 'Test 1', image: 'assets/logo.png'},
    { id: 2, name: 'Test 2', image: 'assets/logo.png'},
    { id: 3, name: 'Test 3', image: 'assets/logo.png'},
    { id: 4, name: 'Test 4', image: 'assets/logo.png'},
    { id: 5, name: 'Test 5', image: 'assets/logo.png'},
    { id: 6, name: 'Test 6', image: 'assets/logo.png'},
    { id: 7, name: 'Test 7', image: 'assets/logo.png'},
    { id: 8, name: 'Test 8', image: 'assets/logo.png'},
    { id: 9, name: 'Test 9', image: 'assets/logo.png'},
  ];
  public foundData: Array<{ id: number; name: string; image: string}> = [];
  public showListSearch = false;
  public exist = true;

  private destroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.searchInput$.pipe(takeUntil(this.destroy$), debounceTime(1000), distinctUntilChanged())
      .subscribe((title: any) => this.searchResult(title.target.value.toLowerCase()));

    this.container$.pipe(takeUntil(this.destroy$)).subscribe((isFocused: any) => {
      this.showListSearch = isFocused;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private searchResult(name: string): void {
    this.foundData = this.data.filter(item => item.name.toLowerCase().includes(name));
    this.exist = !!this.foundData.length;
  }
}

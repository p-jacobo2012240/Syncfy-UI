import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-filter-searching-engine',
  templateUrl: './filter-searching-engine.component.html',
  styleUrls: ['./filter-searching-engine.component.css']
})
export class FilterSearchingEngineComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterCtrl = new FormControl('');
  filteredChips: Observable<string[]>;
  filters: string[] = [];
  allFilters: string[] = ['testFilter', 'Foo'];

  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  constructor() { 
    this.filteredChips = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFilters.slice())),
    );
  }

  ngOnInit(): void {
  }

   add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.filters.push(value);
    }

    event.chipInput!.clear();
    this.filterCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.filters.indexOf(fruit);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.filters.push(event.option.viewValue);
    this.filterInput.nativeElement.value = '';
    this.filterCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFilters.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}

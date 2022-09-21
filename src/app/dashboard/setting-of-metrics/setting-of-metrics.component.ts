import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-of-metrics',
  templateUrl: './setting-of-metrics.component.html',
  styleUrls: ['./setting-of-metrics.component.css']
})
export class SettingOfMetricsComponent implements OnInit {
  public name: string = '';
  public filters: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setValue() {
    console.log('filter', this.name );
    this.filters = JSON.parse(JSON.stringify(localStorage.getItem('filters')));
    this.filters.push(this.name)
    localStorage.setItem('filters', JSON.stringify(this.filters))
  }

}

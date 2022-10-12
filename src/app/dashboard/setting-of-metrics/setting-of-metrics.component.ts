import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ACTIONS } from '../dashboard-utils';

@Component({
  selector: 'app-setting-of-metrics',
  templateUrl: './setting-of-metrics.component.html',
  styleUrls: ['./setting-of-metrics.component.css']
})
export class SettingOfMetricsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTypeOfView();
  }

  getTypeOfView(): void {
    this.activatedRoute.params.subscribe(params => {
      const viewType = ACTIONS[params['type']].toLowerCase();
      if (viewType) {
        this.router
          .navigateByUrl(`/dashboard/metrics-settings/${params['type']}/${viewType}`)
      }
    });
  }

}

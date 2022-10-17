import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ACTIONS } from '../dashboard-utils';
import { map } from 'rxjs';

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
    this.activatedRoute.params.pipe(
      map((element: any) => {
      	let viewType = ACTIONS[element.type].toLowerCase();

        if( viewType === 'automated_tasks') {
          viewType = 'automated-tasks';
          (viewType) && this.router.navigateByUrl(
            `/dashboard/automated-tasks/${element.type}`
          )
        } else {
          (viewType) && this.router.navigateByUrl(
            `/dashboard/metrics-settings/${element.type}/${viewType}`
          ) 
        }
    })).subscribe();
  }

}

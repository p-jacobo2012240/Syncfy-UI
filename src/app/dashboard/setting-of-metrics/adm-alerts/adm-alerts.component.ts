import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AlertDomain } from 'src/app/core/metrics/domains/alert.domain';


@Component({
  selector: 'app-adm-alerts',
  templateUrl: './adm-alerts.component.html',
  styleUrls: ['./adm-alerts.component.css']
})
export class AdmAlertsComponent implements OnInit {

  public dataSource  = new MatTableDataSource();  
  public displayedColumns: string[] = ['Id', 'Nombre', 'Fecha de Creacion', 'Fecha vencimiento', 'Tipo', 'Filtro' ];

  constructor() { 
  }

  ngOnInit(): void {
    let oauth = JSON.parse(JSON.stringify(localStorage.getItem('oauth')));

    console.log('oauth ', oauth );
  }

  
}

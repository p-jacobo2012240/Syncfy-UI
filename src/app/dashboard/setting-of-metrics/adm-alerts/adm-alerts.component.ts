import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlertDomain } from 'src/app/core/metrics/domains/alert.domain';
import { AlertService } from 'src/app/core/metrics/services/alert.service';
import { AdmFormAlertComponent } from './adm-form-alert/adm-form-alert.component';
import { AuthDomain } from 'src/app/core/metrics/domains/auth.domain';
import { AlertCreatorDomain } from 'src/app/core/metrics/domains/alert-creator.domain';

@Component({
  selector: 'app-adm-alerts',
  templateUrl: './adm-alerts.component.html',
  styleUrls: ['./adm-alerts.component.css']
})
export class AdmAlertsComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'creationDate', 'expiryDate', 'type', 'opciones' ];
  public dataSource = new MatTableDataSource();
  private authDomain: AuthDomain = new AuthDomain();

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    const authJson = localStorage.getItem('oauth');
    this.authDomain = authJson !== null ? JSON.parse(authJson) : this.authDomain;
    this.getAlertsByOAuth(this.authDomain.id);
  }

  getAlertsByOAuth(id: Number) {
    this.alertService.alertsByOAuth(id)
      .subscribe((alertDomainList) => {
        console.log(alertDomainList);
        this.dataSource.data = alertDomainList;  
      })
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAlert() {
    const dialogRef = this.dialog.open(
      AdmFormAlertComponent, { 
        data: this.authDomain 
      } 
    );
    
    dialogRef.afterClosed().subscribe((alertCreator: AlertCreatorDomain ) => {
      this.alertService.newAlert(alertCreator);
      this.getAlertsByOAuth(this.authDomain.id);
    });
  }

  deleteAlert(alertDomain: AlertDomain) {
    this.alertService.deleteAlert(alertDomain.id);
    this.getAlertsByOAuth(this.authDomain.id);
  }

  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthDomain } from 'src/app/core/metrics/domains/auth.domain';
import { NotificationCreatorDomain } from 'src/app/core/metrics/domains/notification-creator.domain';
import { NotificationDomain } from 'src/app/core/metrics/domains/notification.domain';
import { NotificationService } from 'src/app/core/metrics/services/notification.service';
import { AdmFormNotificationComponent } from './adm-form-notification/adm-form-notification.component';

@Component({
  selector: 'app-adm-notifications',
  templateUrl: './adm-notifications.component.html',
  styleUrls: ['./adm-notifications.component.css']
})
export class AdmNotificationsComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'creationDate', 'expiryDate', 'type', 'opciones' ];
  private notificationList: NotificationDomain[] = [];
  public dataSource = new MatTableDataSource();
  private authDomain: AuthDomain = new AuthDomain();

  constructor(
    private notificationSerivice: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const authJson = localStorage.getItem('oauth');
    this.authDomain = authJson !== null ? JSON.parse(authJson) : this.authDomain;
    this.notificationByOAuth(this.authDomain.id);
  }

  notificationByOAuth(id: Number) {
    this.notificationSerivice.notificationByOAuth(id)
    .subscribe((notificationDomainList) => {
      console.log(notificationDomainList);
      this.notificationList = notificationDomainList;
      this.dataSource.data = [...this.notificationList];
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNotification() {
    const dialogRef = this.dialog.open(
      AdmFormNotificationComponent, { 
      data: this.authDomain 
      } 
    );
    
    dialogRef.afterClosed().subscribe((notCreator: NotificationCreatorDomain) => {
      this.notificationSerivice.newNotification(notCreator);
      this.notificationByOAuth(this.authDomain.id);
    });
  }

  deleteNotification(notification: NotificationDomain) {
    // see example using observable = https://material.angular.io/components/table/examples 
    this.notificationSerivice.deleteNotification(notification.id);
    this.notificationByOAuth(this.authDomain.id);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthDomain } from 'src/app/core/metrics/domains/auth.domain';
import { NotificationCreatorDomain } from 'src/app/core/metrics/domains/notification-creator.domain';

@Component({
  selector: 'app-adm-form-notification',
  templateUrl: './adm-form-notification.component.html',
  styleUrls: ['./adm-form-notification.component.css']
})
export class AdmFormNotificationComponent implements OnInit {
  public myForm: FormGroup;
  private notCreatorDomain: NotificationCreatorDomain = new NotificationCreatorDomain(); 

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AuthDomain,
    public dialogRef: MatDialogRef<AdmFormNotificationComponent>
  ) {
    this.myForm = this.fb.group({
      name: '',
      creationDate: '',
      expiryDate: '',
      type: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    const { 
      name, creationDate, expiryDate, type  
    } = form.value;

    this.notCreatorDomain.name = name;
    this.notCreatorDomain.creationDate = creationDate;
    this.notCreatorDomain.expiryDate = expiryDate;
    this.notCreatorDomain.type = type;
    this.notCreatorDomain.isValidForFilter = true;
    this.notCreatorDomain.auth0_id = this.data.id;

    this.dialogRef.close(this.notCreatorDomain);
  }

}

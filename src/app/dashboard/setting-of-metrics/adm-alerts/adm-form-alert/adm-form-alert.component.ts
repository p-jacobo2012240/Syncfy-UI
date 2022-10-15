import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertCreatorDomain } from 'src/app/core/metrics/domains/alert-creator.domain';
import { AuthDomain } from 'src/app/core/metrics/domains/auth.domain';

@Component({
  selector: 'app-adm-form-alert',
  templateUrl: './adm-form-alert.component.html',
  styleUrls: ['./adm-form-alert.component.css']
})
export class AdmFormAlertComponent implements OnInit {
  public myForm: FormGroup;
  private alertCreatorDomain: AlertCreatorDomain = new AlertCreatorDomain(); 

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AuthDomain,
    public dialogRef: MatDialogRef<AdmFormAlertComponent>
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

    this.alertCreatorDomain.name = name;
    this.alertCreatorDomain.creationDate = creationDate;
    this.alertCreatorDomain.expiryDate = expiryDate;
    this.alertCreatorDomain.type = type;
    this.alertCreatorDomain.isValidForFilter = true;
    this.alertCreatorDomain.auth0_id = this.data.id;

    this.dialogRef.close(this.alertCreatorDomain);
  }

}

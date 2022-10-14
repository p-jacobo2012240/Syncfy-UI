import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFormAlertComponent } from './adm-form-alert.component';

describe('AdmFormAlertComponent', () => {
  let component: AdmFormAlertComponent;
  let fixture: ComponentFixture<AdmFormAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmFormAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmFormAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFormNotificationComponent } from './adm-form-notification.component';

describe('AdmFormNotificationComponent', () => {
  let component: AdmFormNotificationComponent;
  let fixture: ComponentFixture<AdmFormNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmFormNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmFormNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

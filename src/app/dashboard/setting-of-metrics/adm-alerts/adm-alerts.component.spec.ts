import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAlertsComponent } from './adm-alerts.component';

describe('AdmAlertsComponent', () => {
  let component: AdmAlertsComponent;
  let fixture: ComponentFixture<AdmAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

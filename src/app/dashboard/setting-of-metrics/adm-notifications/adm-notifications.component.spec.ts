import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNotificationsComponent } from './adm-notifications.component';

describe('AdmNotificationsComponent', () => {
  let component: AdmNotificationsComponent;
  let fixture: ComponentFixture<AdmNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

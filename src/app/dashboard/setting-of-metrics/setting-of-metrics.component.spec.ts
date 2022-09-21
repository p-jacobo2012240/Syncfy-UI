import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOfMetricsComponent } from './setting-of-metrics.component';

describe('SettingOfMetricsComponent', () => {
  let component: SettingOfMetricsComponent;
  let fixture: ComponentFixture<SettingOfMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingOfMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingOfMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

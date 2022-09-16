import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSearchingEngineComponent } from './configuration-searching-engine.component';

describe('ConfigurationSearchingEngineComponent', () => {
  let component: ConfigurationSearchingEngineComponent;
  let fixture: ComponentFixture<ConfigurationSearchingEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationSearchingEngineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSearchingEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

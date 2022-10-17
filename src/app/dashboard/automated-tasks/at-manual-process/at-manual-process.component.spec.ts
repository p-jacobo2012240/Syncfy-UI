import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtManualProcessComponent } from './at-manual-process.component';

describe('AtManualProcessComponent', () => {
  let component: AtManualProcessComponent;
  let fixture: ComponentFixture<AtManualProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtManualProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtManualProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

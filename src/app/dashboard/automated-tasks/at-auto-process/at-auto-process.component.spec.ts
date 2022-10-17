import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtAutoProcessComponent } from './at-auto-process.component';

describe('AtAutoProcessComponent', () => {
  let component: AtAutoProcessComponent;
  let fixture: ComponentFixture<AtAutoProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtAutoProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtAutoProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

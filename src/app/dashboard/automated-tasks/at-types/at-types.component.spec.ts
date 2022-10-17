import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtTypesComponent } from './at-types.component';

describe('AtTypesComponent', () => {
  let component: AtTypesComponent;
  let fixture: ComponentFixture<AtTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

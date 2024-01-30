import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cl1Component } from './cl1.component';

describe('Cl1Component', () => {
  let component: Cl1Component;
  let fixture: ComponentFixture<Cl1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

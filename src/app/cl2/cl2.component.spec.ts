import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Cl2Component } from './cl2.component';

describe('Cl2Component', () => {
  let component: Cl2Component;
  let fixture: ComponentFixture<Cl2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

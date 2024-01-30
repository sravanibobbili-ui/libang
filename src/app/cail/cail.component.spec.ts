import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CailComponent } from './cail.component';

describe('CailComponent', () => {
  let component: CailComponent;
  let fixture: ComponentFixture<CailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErComponent } from './er.component';

describe('ErComponent', () => {
  let component: ErComponent;
  let fixture: ComponentFixture<ErComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

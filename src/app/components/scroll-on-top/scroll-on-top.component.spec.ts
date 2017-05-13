import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollOnTopComponent } from './scroll-on-top.component';

describe('ScrollOnTopComponent', () => {
  let component: ScrollOnTopComponent;
  let fixture: ComponentFixture<ScrollOnTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollOnTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollOnTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

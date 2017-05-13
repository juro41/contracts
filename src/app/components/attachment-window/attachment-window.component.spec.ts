import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentWindowComponent } from './attachment-window.component';

describe('AttachmentWindowComponent', () => {
  let component: AttachmentWindowComponent;
  let fixture: ComponentFixture<AttachmentWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

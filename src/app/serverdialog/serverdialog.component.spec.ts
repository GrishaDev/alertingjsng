import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerdialogComponent } from './serverdialog.component';

describe('ServerdialogComponent', () => {
  let component: ServerdialogComponent;
  let fixture: ComponentFixture<ServerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

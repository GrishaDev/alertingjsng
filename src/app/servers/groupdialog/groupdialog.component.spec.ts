import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupdialogComponent } from './groupdialog.component';

describe('GroupdialogComponent', () => {
  let component: GroupdialogComponent;
  let fixture: ComponentFixture<GroupdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

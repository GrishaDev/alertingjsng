import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingareaComponent } from './testingarea.component';

describe('TestingareaComponent', () => {
  let component: TestingareaComponent;
  let fixture: ComponentFixture<TestingareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

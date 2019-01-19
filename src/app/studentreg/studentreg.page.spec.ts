import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentregPage } from './studentreg.page';

describe('StudentregPage', () => {
  let component: StudentregPage;
  let fixture: ComponentFixture<StudentregPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentregPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

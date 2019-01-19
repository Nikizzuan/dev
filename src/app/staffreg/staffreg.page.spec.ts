import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffregPage } from './staffreg.page';

describe('StaffregPage', () => {
  let component: StaffregPage;
  let fixture: ComponentFixture<StaffregPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffregPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

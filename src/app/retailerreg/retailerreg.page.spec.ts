import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerregPage } from './retailerreg.page';

describe('RetailerregPage', () => {
  let component: RetailerregPage;
  let fixture: ComponentFixture<RetailerregPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerregPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

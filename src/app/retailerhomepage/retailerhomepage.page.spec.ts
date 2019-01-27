import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerhomepagePage } from './retailerhomepage.page';

describe('RetailerhomepagePage', () => {
  let component: RetailerhomepagePage;
  let fixture: ComponentFixture<RetailerhomepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerhomepagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerhomepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

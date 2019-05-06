import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatingpagePage } from './watingpage.page';

describe('WatingpagePage', () => {
  let component: WatingpagePage;
  let fixture: ComponentFixture<WatingpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatingpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatingpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcuponPage } from './viewcupon.page';

describe('ViewcuponPage', () => {
  let component: ViewcuponPage;
  let fixture: ComponentFixture<ViewcuponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcuponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

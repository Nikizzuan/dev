import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcuponPage } from './addcupon.page';

describe('AddcuponPage', () => {
  let component: AddcuponPage;
  let fixture: ComponentFixture<AddcuponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcuponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

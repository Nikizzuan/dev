import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpagePage } from './registerpage.page';

describe('RegisterpagePage', () => {
  let component: RegisterpagePage;
  let fixture: ComponentFixture<RegisterpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

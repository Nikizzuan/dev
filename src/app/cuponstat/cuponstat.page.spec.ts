import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponstatPage } from './cuponstat.page';

describe('CuponstatPage', () => {
  let component: CuponstatPage;
  let fixture: ComponentFixture<CuponstatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponstatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponstatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

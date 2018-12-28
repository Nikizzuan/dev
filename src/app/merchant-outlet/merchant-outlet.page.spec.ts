import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOutletPage } from './merchant-outlet.page';

describe('MerchantOutletPage', () => {
  let component: MerchantOutletPage;
  let fixture: ComponentFixture<MerchantOutletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantOutletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantOutletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

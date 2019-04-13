import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedetailPage } from './purchasedetail.page';

describe('PurchasedetailPage', () => {
  let component: PurchasedetailPage;
  let fixture: ComponentFixture<PurchasedetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

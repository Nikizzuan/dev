import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmanagementPage } from './productmanagement.page';

describe('ProductmanagementPage', () => {
  let component: ProductmanagementPage;
  let fixture: ComponentFixture<ProductmanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmanagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

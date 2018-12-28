import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPayPage } from './qr-pay.page';

describe('QrPayPage', () => {
  let component: QrPayPage;
  let fixture: ComponentFixture<QrPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrPayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

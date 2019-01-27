import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemtaionPage } from './redemtaion.page';

describe('RedemtaionPage', () => {
  let component: RedemtaionPage;
  let fixture: ComponentFixture<RedemtaionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedemtaionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemtaionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

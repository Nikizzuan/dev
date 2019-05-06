import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnotiPage } from './viewnoti.page';

describe('ViewnotiPage', () => {
  let component: ViewnotiPage;
  let fixture: ComponentFixture<ViewnotiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnotiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnotiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

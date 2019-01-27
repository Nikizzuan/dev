import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapslocaterComponent } from './mapslocater.component';

describe('MapslocaterComponent', () => {
  let component: MapslocaterComponent;
  let fixture: ComponentFixture<MapslocaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapslocaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapslocaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

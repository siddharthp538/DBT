import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasagencyhomeComponent } from './gasagencyhome.component';

describe('GasagencyhomeComponent', () => {
  let component: GasagencyhomeComponent;
  let fixture: ComponentFixture<GasagencyhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasagencyhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasagencyhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

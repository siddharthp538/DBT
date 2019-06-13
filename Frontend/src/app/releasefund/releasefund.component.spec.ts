import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasefundComponent } from './releasefund.component';

describe('ReleasefundComponent', () => {
  let component: ReleasefundComponent;
  let fixture: ComponentFixture<ReleasefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

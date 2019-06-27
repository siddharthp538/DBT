import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtauthhomeComponent } from './govtauthhome.component';

describe('GovtauthhomeComponent', () => {
  let component: GovtauthhomeComponent;
  let fixture: ComponentFixture<GovtauthhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtauthhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtauthhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

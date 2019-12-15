import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlfComponent } from './hlf.component';

describe('HlfComponent', () => {
  let component: HlfComponent;
  let fixture: ComponentFixture<HlfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

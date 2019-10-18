import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleDefaultComponent } from './style-default.component';

describe('StyleDefaultComponent', () => {
  let component: StyleDefaultComponent;
  let fixture: ComponentFixture<StyleDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

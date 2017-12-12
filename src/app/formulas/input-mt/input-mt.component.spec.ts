import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMtComponent } from './input-mt.component';

describe('InputMtComponent', () => {
  let component: InputMtComponent;
  let fixture: ComponentFixture<InputMtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

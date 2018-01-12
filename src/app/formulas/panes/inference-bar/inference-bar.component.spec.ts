import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InferenceBarComponent } from './inference-bar.component';

describe('InferenceBarComponent', () => {
  let component: InferenceBarComponent;
  let fixture: ComponentFixture<InferenceBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InferenceBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InferenceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

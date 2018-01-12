import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InferencePaneComponent } from './inference-pane.component';

describe('InferencePaneComponent', () => {
  let component: InferencePaneComponent;
  let fixture: ComponentFixture<InferencePaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InferencePaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InferencePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

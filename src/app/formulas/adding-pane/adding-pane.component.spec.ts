import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingPaneComponent } from './adding-pane.component';

describe('AddingPaneComponent', () => {
  let component: AddingPaneComponent;
  let fixture: ComponentFixture<AddingPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

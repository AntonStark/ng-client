import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSaveBarComponent } from './load-save-bar.component';

describe('LoadSaveBarComponent', () => {
  let component: LoadSaveBarComponent;
  let fixture: ComponentFixture<LoadSaveBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadSaveBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSaveBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBoxComponent } from './tabs-box.component';

describe('TabsBoxComponent', () => {
  let component: TabsBoxComponent;
  let fixture: ComponentFixture<TabsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabInfo } from '../tab-info';

@Component({
  selector: 'app-tabs-box',
  templateUrl: './tabs-box.component.html',
  styleUrls: ['./tabs-box.component.css']
})
export class TabsBoxComponent implements OnInit {
  @Input() tabs: TabInfo[];
  selected: TabInfo;
  @Output() change: EventEmitter<TabInfo> = new EventEmitter<TabInfo>();

  constructor() {
  }

  ngOnInit() {
    this.selected = this.tabs[0];
  }

  onSelect(tab: TabInfo) {
    this.selected = tab;
    this.change.emit(this.selected);
  }

}

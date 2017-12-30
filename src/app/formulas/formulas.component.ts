import { Component, OnInit } from '@angular/core';

import { ChannelService } from '../channel.service';
import { InfoType } from '../info-type.enum';
import { TabInfo } from './tab-info';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.css']
})
export class FormulasComponent implements OnInit {
  currentTab: TabInfo;

  displayRendered = false;
  constructor(private channel: ChannelService) {
    this.currentTab = new TabInfo('');
  }

  async infoHandler(mlObject) {
    if (mlObject.label.length === 1 && mlObject.label[0] === 0)
      this.currentTab.data.length = 0;
    this.currentTab.data.push(mlObject);
  }

  ngOnInit() {
    this.channel
      .registerHandler(InfoType.MathlangObject,
        this.infoHandler.bind(this));
    // todo Синхронизация первичных запрсоов
    /*this.channel.send({
      type: InfoType.Text,
      mess: ['plugIn', 'math']
    });*/
  }
}

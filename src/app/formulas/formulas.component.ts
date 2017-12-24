import { Component, OnInit } from '@angular/core';

import { ChannelService } from '../channel.service';
import { FormulaInfo } from './formula-info';
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
    const formulaInfo = new FormulaInfo(mlObject.mlType,
      mlObject.label, mlObject.body, mlObject.premises);
    if (formulaInfo.label.length === 1 && formulaInfo.label[0] === 0)
      this.currentTab.data.length = 0;
    this.currentTab.data.push(formulaInfo);
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

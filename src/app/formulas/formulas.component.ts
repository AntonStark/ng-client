import { Component, OnInit } from '@angular/core';

import { ChannelService } from '../channel.service';
import { FormulaInfo } from './formula-info';
import { InfoType } from '../info-type.enum';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.css']
})
export class FormulasComponent implements OnInit {
  fInfoStorage: FormulaInfo[];
  constructor(private channel: ChannelService) {
    this.fInfoStorage = [];
  }

  async infoHandler(mlObject) {
    mlObject = JSON.parse(mlObject);
    const formulaInfo = new FormulaInfo(mlObject.mlType,
      mlObject.label, mlObject.body, mlObject.premises);
    this.fInfoStorage.push(formulaInfo);
    console.log(formulaInfo);
  }

  ngOnInit() {
    this.channel
      .registerHandler(InfoType.MathlangObject,
        this.infoHandler.bind(this));
  }
}

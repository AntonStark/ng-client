import { Component, OnInit } from '@angular/core';

import { ChannelService } from '../channel.service';
import { InfoType } from '../info-type.enum';
import { FormulaInfoStorageService } from './formula-info-storage.service';

declare const MathJax: any;

@Component({
  selector: 'app-formulas',
  providers: [ FormulaInfoStorageService ],
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.css']
})
export class FormulasComponent implements OnInit {
  selectedFormula;
  primaryNode = false;

  constructor(private channel: ChannelService,
              protected formulasStorage: FormulaInfoStorageService) { }

  async infoHandler(mlObject) {
    if (mlObject.label.length === 1 && mlObject.label[0] === 0)
      this.formulasStorage.clear();
    this.formulasStorage.push(mlObject);
    this.primaryNode = this.formulasStorage.getHead()['is_primary_node'];
  }

  ngOnInit() {
    MathJax.Hub.Config({
      tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
      showMathMenu: false,
      elements: ['tex'],
      SVG: {styles: {'.MathJax_SVG_Display': {margin: 0}}},
      CommonHTML: {styles: {
        '.mjx-chtml': {outline: 'none'},
        '.MJXc-display': {margin: 0}
      }}
    });

    this.channel
      .registerHandler(InfoType.MathlangObject,
        this.infoHandler.bind(this));
    this.channel.send({
      type: InfoType.Text,
      mess: ['plugIn', 'math']
    });
    this.channel.send({
      type: InfoType.Text,
      mess: ['view_work']
    });
  }
}

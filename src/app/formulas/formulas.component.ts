import { Component, OnInit } from '@angular/core';

import { ChannelService } from '../channel.service';
import { InfoType } from '../info-type.enum';
import { TabInfo } from './tab-info';

declare const MathJax: any;

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.css']
})
export class FormulasComponent implements OnInit {
  currentTab: TabInfo;
  selectedFormula;

  constructor(private channel: ChannelService) {
    this.currentTab = new TabInfo('');
  }

  async infoHandler(mlObject) {
    if (mlObject.label.length === 1 && mlObject.label[0] === 0)
      this.currentTab.data.length = 0;
    this.currentTab.data.push(mlObject);
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
  }
}

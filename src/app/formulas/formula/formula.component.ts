import { AfterViewInit, Component, Input } from '@angular/core';
import { FormulaInfo } from '../formula-info';

declare const MathJax: any;

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements AfterViewInit {
  @Input() info: FormulaInfo;
  constructor() { }

  ngAfterViewInit() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
}

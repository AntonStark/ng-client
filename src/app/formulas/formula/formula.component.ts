import { Component, Input } from '@angular/core';
import { FormulaInfo } from '../formula-info';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent {
  @Input() info: FormulaInfo;
  constructor() { }
}

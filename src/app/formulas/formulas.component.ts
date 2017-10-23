import { Component } from '@angular/core';
import { FormulaInfo } from './formula-info';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.css']
})
export class FormulasComponent {
  fInfoStorage: FormulaInfo[];
  mockFormulas: FormulaInfo[] = [
    {body: 'A', id: 1},
    {body: '\\Rightarrow (A, B)', id: 1}
  ];
  constructor() {
    this.fInfoStorage = this.mockFormulas;
  }

}

import { FormulaInfo } from './formula-info';

export class TabInfo {
  _title: string;
  data: FormulaInfo[];

  constructor(title: string) {
    this._title = title;
    this.data = [];
  }
}

import { MlType } from './ml-type.enum';

export type Path = number[];
export class FormulaInfo {
  mlType: MlType;
  label: Path;
  body: string;
  premises: Path[];

  constructor(_mlType: MlType, _label: Path,
              _body: string, _premises: Path[] = []) {
    this.mlType = _mlType;
    this.label = _label;
    this.body = _body;
    this.premises = _premises;
  }
}

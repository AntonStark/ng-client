import {InfoType} from './info-type.enum';

export class DataEntry {
  readonly type: InfoType;
  readonly mess: Object;

  constructor(_type: InfoType, _mess: any) {
    this.type = _type;
    this.mess = _mess;
  }
}

import {InfoType} from './info-type.enum';

export class DataEntry {
  private type: InfoType;
  private mess: string;

  constructor(_type: InfoType, _mess: string) {
    this.type = _type;
    this.mess = _mess;
  }

  static ofText(data: string): DataEntry {
    return new DataEntry(InfoType.Text, data);
  }
}

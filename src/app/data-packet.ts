import {DataEntry} from './data-entry';

export class DataPacket {
  private meta: object;
  private data: DataEntry[];

  constructor(_meta: object, _data: DataEntry[]) {
    this.meta = _meta;
    this.data = _data;
  }
}

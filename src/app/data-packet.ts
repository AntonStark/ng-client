import {DataEntry} from './data-entry';

export class DataPacket {
  readonly meta: object;
  readonly data: DataEntry[];

  constructor(_meta: object, _data: DataEntry[]) {
    this.meta = _meta;
    this.data = _data;
  }
}

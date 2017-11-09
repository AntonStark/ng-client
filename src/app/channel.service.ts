import { isUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from './cookie.service';
import { DataEntry } from './data-entry';
import { DataPacket } from './data-packet';
import { InfoType } from './info-type.enum';

type Handler = (infoData: any) => void;

@Injectable()
export class ChannelService {
  private url = 'http://phoenix.spotlife.ru/spikard/';
  private views: Map<InfoType, Handler[]>;
  constructor(private channel: HttpClient) {
    this.views = new Map<InfoType, Handler[]>();
  }

  registerHandler(infoType: InfoType,
                  inserter: Handler): void {
    if (this.views.has(infoType))
      this.views.get(infoType).push(inserter);
    else
      this.views.set(infoType, [inserter]);
  }

  propagate(dataEntries: DataEntry[]): void {
    for (const dataEntry of dataEntries)
      if (this.views.has(dataEntry.type))
        for (const ins of this.views.get(dataEntry.type))
          ins(dataEntry.mess);
  }

  getUserID(): string {
    return isUndefined(CookieService.get('user-id')) ?
      '0' : CookieService.get('user-id');
  }

  processMeta(meta: Object): void {
    if (!isUndefined(meta['user-id']))
      if (meta['user-id'] !== this.getUserID())
        CookieService.set('user-id', meta['user-id']);
  }
  process(dataPacket: DataPacket): void {
    this.processMeta(dataPacket.meta);
    this.propagate(dataPacket.data);
  }
  async send(infoType: InfoType, data: any): Promise<void> {
    const meta = {'user-id': this.getUserID()};
    const req = new DataPacket(meta, [new DataEntry(infoType, data)]);
    const response = await this.channel
      .post<DataPacket>(this.url, JSON.stringify(req)).toPromise();
    this.process(response);
  }

  ask(infoType: InfoType, data: any) {
    const meta = {'user-id': this.getUserID()};
    const req = new DataPacket(meta, [new DataEntry(infoType, data)]);
    return this.channel
      .post<DataPacket>(this.url, JSON.stringify(req)).toPromise();
  }
}

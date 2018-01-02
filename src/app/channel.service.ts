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
  meta = {'user-id': this.getUserID()};
  // private url = 'http://phoenix.spotlife.ru/spikard/';
  url = 'http://localhost/spikard/';

  channelReady = false;
  queue;
  views = new Map<InfoType, Handler[]>();

  constructor(private channel: HttpClient) {
    this.queue = [];

    const initReq = new DataPacket(this.meta, [
      new DataEntry(InfoType.Text, ['getInterface'])
    ]);
    channel.post<DataPacket>(this.url, JSON.stringify(initReq))
      .subscribe(ans => {
        this.processMeta(ans.meta);
        this.channelReady = true;
        this.releaseEntries();
      });
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
    this.meta = {'user-id': this.getUserID()};
  }

  private call(data: DataEntry, callback) {
    if (this.channelReady) {
      const req = new DataPacket(this.meta, [data]);
      return this.channel
        .post<DataPacket>(this.url, JSON.stringify(req))
        .toPromise().then(resp => callback(resp.data));
    }
    else
      this.queue.push({data, callback});
  }

  releaseEntries(): void {
    for (const entry of this.queue) {
      this.call(entry.data, entry.callback);
    }
  }

  send(data: DataEntry) {
    this.call(data, this.propagate.bind(this));
  }
  ask(data: DataEntry, callback) {
    return this.call(data, callback);
  }
}

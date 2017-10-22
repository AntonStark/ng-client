import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  constructor() { }
  static get(key: string): string {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + key.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return (matches ? decodeURIComponent(matches[1]) : undefined);
  }
  static set(key: string, value: string): void {
    document.cookie = key + '=' + value + '; path=/;';
  }
}

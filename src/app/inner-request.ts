import { isUndefined } from 'util';

export class InnerRequest {
  private headers = {};
  private content = false;
  private body = '';

  static getCookie(name): string {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return (matches ? decodeURIComponent(matches[1]) : undefined);
  }

  isContent(): boolean {
    return this.content;
  }
  isError(): boolean {
    return isUndefined(this.headers);
  }

  setH(key: string, value: string): void {
    key = key.toString().toLowerCase();
    value = value.toString().toLowerCase();
    this.headers[key] = value;
  }
  setB(_body: string): void {
    this.content = true;
    this.body = _body;
    this.setH('length', decodeURI(encodeURIComponent(_body)).length.toString());
  }

  getH(key: string): string {
    return this.headers[key.toString().toLowerCase()];
  }
  getB(): string {
    return this.body;
  }

  toString(): string {
    let buf = '';
    for (const KEY in this.headers) {
      if (this.headers.hasOwnProperty(KEY))
        buf += KEY + ': ' + this.getH(KEY) + ';';
    }
    buf += ';';
    if (this.content)
      buf += this.body;
    return buf;
  }

  withBody(_body: string): InnerRequest {
    let userId = InnerRequest.getCookie('user-id');
    if (isUndefined(userId))
      userId = '0';
    const temp = new InnerRequest();
    temp.setH('user-id', userId);
    if (_body.length !== 0)
      temp.setB(_body);
    return temp;
  }
  fromString(response: string): InnerRequest {
    const temp = new InnerRequest();

    const parse = response.split(';;');

    for (const HEADER of parse[0].split(';')) {
      const pair = HEADER.split(': ');
      if (pair.length !== 2)
        break;
      temp.setH(pair[0], pair[1]);
    }
    let _body = '';
    if (parse.length > 1) {
      parse.shift();
      _body = parse.join(';;');
      temp.setB(_body);
    }

    if (isUndefined(temp.getH('user-id')) ||
        isUndefined(temp.getH('length')) ||
        (temp.isContent() &&
          temp.getH('length') !== decodeURI(encodeURIComponent(_body)).length.toString()
        ) ) {
      temp.headers = undefined;
      temp.content = false;
      temp.body = '';
      console.error('Ошибка при разборе InnerRequest!');
    }

    if (temp.getH('user-id') !== InnerRequest.getCookie('user-id'))
      document.cookie = 'user-id=' + temp.getH('user-id') + '; path=/;';
    return temp;
  }
}

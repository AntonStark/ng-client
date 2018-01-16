import { Injectable } from '@angular/core';

@Injectable()
export class FormulaInfoStorageService {
  _storage;

  constructor() {
    this._storage = [];
  }

  push(fInfo) { this._storage.push(fInfo); }
  clear() { this._storage.length = 0; }
  getHead() { return this._storage[0]; }
  getAll() { return this._storage; }

  isSameLabel(one: number[], two: number[]): boolean {
    if (one.length !== two.length)
      return false;
    for (let i = 0; i < one.length; ++i)
      if (one[i] !== two[i])
        return false;
    return true;
  }
  pathToStr(path: number[]): String {
    let buf = '(';
    if (path.length === 0)
      return '()';
    buf += path[0];
    for (let i = 1; i < path.length; ++i)
      buf += '.' + path[i];
    buf += ')';
    return buf;
  }

  getByLabel(label: number[]) {
    for (const f of this._storage)
      if (this.isSameLabel(f.label, label))
        return f;
    return {
      mlType: 'text',
      label: label,
      body: 'Ссылка ' + this.pathToStr(label) + ' недоступна'
    };
  }
}

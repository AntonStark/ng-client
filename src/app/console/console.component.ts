import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InnerRequest } from '../inner-request';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent {
  canvas: string;
  constructor (private channel: HttpClient) {
    this.canvas = '>';
  }

  takeLastLine(): string {
    return this.canvas.split('\n').slice(-2, -1).pop().slice(1);
  }
  onKeyUp(e): boolean {
    this.canvas = e.target.value;
    if (e.keyCode === 13)
      this.sender(this.takeLastLine());
    return true;
  }
  sender(text): void {
    this.channel.post('http://phoenix.spotlife.ru/spikard/',
      new InnerRequest().withBody(text).toString(), {responseType: 'text'})
      .subscribe(answer => this.canvas += new InnerRequest().fromString(answer).getB() + '>');
  }
}

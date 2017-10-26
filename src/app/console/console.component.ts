import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {DataPacket} from '../data-packet';
import {CookieService} from '../cookie.service';
import {DataEntry} from '../data-entry';

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
      JSON.stringify(
        new DataPacket({
          'user-id': CookieService.get('user-id')
        }, [DataEntry.ofText(text)])))
      .subscribe(answer => this.canvas += answer.toString() + '\n>');
  }
}

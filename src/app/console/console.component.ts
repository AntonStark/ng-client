import { Component, OnInit } from '@angular/core';

import { InfoType } from '../info-type.enum';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  public canvas: string;

  constructor (private channel: ChannelService) {
    this.canvas = '>';
  }

  async textHandler(info: string) {
    this.canvas += info + '\n>';
  }
  async errInfoHandler(info: string) {
    this.canvas += 'Ошибка: ' + info + '\n>';
  }

  ngOnInit() {
    this.channel
      .registerHandler(InfoType.Text,
        this.textHandler.bind(this));
    this.channel
      .registerHandler(InfoType.Error,
        this.errInfoHandler.bind(this));
  }

  takeLastLine(): string {
    return this.canvas.split('\n').slice(-2, -1).pop().slice(1);
  }
  onKeyUp(e): boolean {
    this.canvas = e.target.value;
    if (e.keyCode === 13)
      this.channel.send(InfoType.Text, this.takeLastLine());
    return true;
  }
}

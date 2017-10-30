import { Component, OnInit } from '@angular/core';

import { InfoType } from '../info-type.enum';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  private canvas: string;

  constructor (private channel: ChannelService) {
    this.canvas = '>';
  }

  async infoHandler(info: string) {
    this.canvas += info + '\n>';
  }

  ngOnInit() {
    this.channel
      .registerHandler(InfoType.Text,
        this.infoHandler.bind(this));
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

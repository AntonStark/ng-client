import { ChannelService } from '../../../channel.service';
import { Component } from '@angular/core';
import { InfoType } from '../../../info-type.enum';
import { DataEntry } from '../../../data-entry';

@Component({
  selector: 'app-load-save-bar',
  templateUrl: './load-save-bar.component.html',
  styleUrls: ['../panes.component.css', './load-save-bar.component.css']
})
export class LoadSaveBarComponent {
  works = [];
  displayIndex = false;

  constructor(private channel: ChannelService) {}

  toggleIndex() {
    this.displayIndex = !this.displayIndex;
    if (this.displayIndex)
      this.channel.ask({mess: ['view_index'], type: InfoType.Text},
        function (answer: DataEntry[]) {
          for (const a of answer)
            this.works.push(a.mess);
        }.bind(this));
    else
      this.works.length = 0;
  }

  open(work: string) {
    this.channel.send({mess: ['load', work], type: InfoType.Text});
    this.toggleIndex();
  }
}

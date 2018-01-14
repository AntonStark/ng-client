import { Component } from '@angular/core';

import { ChannelService } from '../../../channel.service';
import { DataEntry } from '../../../data-entry';
import { InfoType } from '../../../info-type.enum';

@Component({
  selector: 'app-load-save-bar',
  templateUrl: './load-save-bar.component.html',
  styleUrls: ['../panes.component.css', './load-save-bar.component.css']
})
export class LoadSaveBarComponent {
  works = [];
  displayIndex = false;
  title = '';

  constructor(private channel: ChannelService) {}

  toggleIndex() {
    this.displayIndex = !this.displayIndex;
    if (this.displayIndex)
      this.channel
        .ask({mess: ['view_index'], type: InfoType.Text},
          function (answer: DataEntry[]) {
            for (const a of answer)
              this.works.push(a.mess);
          }.bind(this));
    else
      this.works.length = 0;
  }

  saveChanges() {
    this.channel
      .send({mess: 'save_changes', type: InfoType.Text});
  }

  saveAs() {
    this.channel
      .send({mess: ['save_as', this.title], type: InfoType.Text});
  }

  open(work: string) {
    this.channel
      .send({mess: ['load', work], type: InfoType.Text});
    this.toggleIndex();
  }
}

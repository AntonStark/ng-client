import { AfterViewChecked, Component, Input } from '@angular/core';
import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';
import { FormulaInfoStorageService } from '../formula-info-storage.service';

declare const MathJax: any;

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements AfterViewChecked {
  @Input() info;
  _selected: boolean;
  _unselected: boolean;
  @Input() set selected(newSelected: boolean) {
    this._unselected = (this._selected && !newSelected);
    this._selected = newSelected;
  }
  constructor(private channel: ChannelService,
              protected formulasStorage: FormulaInfoStorageService) { }

  ngAfterViewChecked() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  toSub() {
    if (this.info.label[0] === 0)
      this.channel.send({type: InfoType.Text, mess: ['to_par']});
    else
      this.channel.send({
        type: InfoType.Text,
        mess: ['to_sub', String(this.info.label[0])]
      });
  }

  inferenceMess(): string {
    const pre1 = this.formulasStorage.pathToStr(this.info.premises[0]);
    const pre2 = this.formulasStorage.pathToStr(this.info.premises[1]);
    switch (this.info.type) {
      case 'InfMP' :
        return '{Из ' + pre1 + ' по ' + pre2 + ' следует: }';
      case 'InfSpec' :
        return '{Из ' + pre1 + ' для ' + pre2 + ' получаем: }';
      case 'InfAppl' :
        return '{Применив к ' + pre1 +
          ' теорему ' + pre2 + ' получаем: }';
      case 'InfEql' :
        return '{Применив к '  + pre1 +
          ' равенство ' + pre2 + ' получаем: }';
    }
  }
}

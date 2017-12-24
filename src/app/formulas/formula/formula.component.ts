import { AfterViewInit, Component, Input } from '@angular/core';
import { FormulaInfo, Path } from '../formula-info';
import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';

declare const MathJax: any;

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements AfterViewInit {
  @Input() info: FormulaInfo;
  constructor(private channel: ChannelService) { }

  ngAfterViewInit() {
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

  pathToStr(path: Path): String {
    let buf = '(';
    if (path.length === 0)
      return '()';
    buf += path[0];
    for (let i = 1; i < path.length; ++i)
      buf += '.' + path[i];
    buf += ')';
    return buf;
  }
}

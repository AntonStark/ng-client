import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../../../channel.service';
import { InfoType } from '../../../info-type.enum';

@Component({
  selector: 'app-adding-pane',
  templateUrl: './adding-pane.component.html',
  styleUrls: ['../panes.component.css']
})
export class AddingPaneComponent implements OnInit {
  mathTypes: string[];

  viewState = 'menu';

  type: FormGroup;
  variable: FormGroup;
  sym: FormGroup;
  axiom: FormGroup;

  constructor(private fb: FormBuilder, private channel: ChannelService) {
    this.mathTypes = [];

    this.type = fb.group({
      typeName: ['', Validators.required]
    });
    this.variable = fb.group({
      varName:  ['', Validators.required],
      typeName: ['', Validators.required],
    });
    this.sym = fb.group({
      symName: ['', Validators.required],
      arg1Type: '',
      arg2Type: '',
      arg3Type: '',
      retType: ['', Validators.required],
    });
    this.axiom = fb.group({
      axiom: ['', Validators.required],
    });
  }

  defaultLayout(): void { this.viewState = 'menu'; }

  addType(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['add_type', this.type.get('typeName').value]
    });
    this.defaultLayout();
    return false;
  }
  addVar(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['add_var',
        this.variable.get('varName').value,
        this.variable.get('typeName').value]
    });
    this.defaultLayout();
    return false;
  }
  addSym(): boolean {
    const mess = ['add_sym', this.sym.get('symName').value];
    for (const i of [1, 2, 3]) {
      const arg: String = this.sym.get('arg' + i + 'Type').value;
      if (arg.length !== 0)
        mess.push(arg);
    }
    mess.push(this.sym.get('retType').value);
    this.channel.send({type: InfoType.Text, mess: mess});
    this.defaultLayout();
    return false;
  }
  addAxiom(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['add_axiom', this.axiom.get('axiom').value]
    });
    this.defaultLayout();
    return false;
  }

  async namesUpdater(nameInfo) {
    if (nameInfo.hasOwnProperty('types'))
      this.mathTypes = nameInfo['types'];
    if (nameInfo.hasOwnProperty('type'))
      this.mathTypes.push(nameInfo['type']);
  }

  ngOnInit() {
    this.channel
      .registerHandler(InfoType.MathlangName,
        this.namesUpdater.bind(this));
  }
}

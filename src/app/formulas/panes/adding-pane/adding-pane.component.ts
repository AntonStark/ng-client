import { Component, Input, OnInit } from '@angular/core';
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
  @Input() primaryNode: boolean;

  viewState = 'menu';
  type: FormGroup;
  variable: FormGroup;
  sym: FormGroup;
  axiom: FormGroup;

  branch: FormGroup;

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
    this.branch = fb.group({
      nodeType: ['', Validators.required],
      title: '',
    });
  }

  defaultLayout(): void { this.viewState = 'menu'; }

  refreshTypes() {
    this.channel.send({type: InfoType.Text, mess: ['view_types', '0']});
  }

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

  startNode() {
    const type = this.branch.get('nodeType').value;
    let cmd = '';
    switch (type) {
      case 'курс' :
        cmd = 'start_course'; break;
      case 'раздел' :
        cmd = 'start_section'; break;
      case 'лекцию' :
        cmd = 'start_lecture'; break;
    }
    const title = this.branch.get('title').value;
    let cmdArgs;
    if (title !== null && title.length > 0)
      cmdArgs = [cmd, title];
    else
      cmdArgs = [cmd];
    this.channel.send({type: InfoType.Text, mess: cmdArgs});
    this.branch.reset();
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

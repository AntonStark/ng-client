import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';

@Component({
  selector: 'app-adding-pane',
  templateUrl: './adding-pane.component.html',
  styleUrls: ['./adding-pane.component.css']
})
export class AddingPaneComponent {
  viewState = 'initial';

  type: FormGroup;
  variable: FormGroup;
  sym: FormGroup;
  axiom: FormGroup;

  constructor(private fb: FormBuilder, private channel: ChannelService) {
    this.type = fb.group({
      typeName: ['', Validators.required]
    });
    this.variable = fb.group({
      varName: '',
      typeName: ''
    });
    this.sym = fb.group({
      symName: '',
      arg1Type: '', // todo добавить кнопку добавления инпутов
      retType: ''
    });
    this.axiom = fb.group({
      axiom: ''
    });
  }

  back(): void {
    if (this.viewState === 'menu')
      this.viewState = 'initial';
    else
      this.viewState = 'menu';
  }

  addType(): void {
    this.channel.send(InfoType.Text,
      'add_type ' + this.type.get('typeName').value);
    this.viewState = 'initial';
  }
  addVar(): void {
    this.channel.send(InfoType.Text, 'add_var ' +
      this.variable.get('varName').value + ' ' +
      this.variable.get('typeName').value);
    this.viewState = 'initial';
  }
  addSym(): void {
    this.channel.send(InfoType.Text, 'add_sym ' +
      this.sym.get('symName').value + ' ' +
      this.sym.get('arg1Type').value + ' ' +
      this.sym.get('retType').value);
    this.viewState = 'initial';
  }
  addAxiom(): void {
    this.channel.send(InfoType.Text, 'add_axiom ' +
      this.axiom.get('axiom').value);
    this.viewState = 'initial';
  }
}

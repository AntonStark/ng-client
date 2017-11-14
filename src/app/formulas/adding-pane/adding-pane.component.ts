import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';

@Component({
  selector: 'app-adding-pane',
  templateUrl: './adding-pane.component.html',
  styleUrls: ['./adding-pane.component.css']
})
export class AddingPaneComponent {
  viewState = 'initial';
  main: FormGroup;

  constructor(private fb: FormBuilder, private channel: ChannelService) {
    this.main = fb.group({
      initial: new FormGroup({}),
      type: fb.group({
        typeName: ['', Validators.required]
      }),
      variable: fb.group({
        varName: '',
        typeName: ''
      }),
      sym: fb.group({
        symName: '',
        arg1Type: '', // todo добавить кнопку добавления инпутов
        retType: ''
      }),
      axiom: fb.group({
        axiom: ''
      })
    });
  }

  addType(): void {
    this.channel.send(InfoType.Text,
      'add_type ' + this.main.get('type.typeName').value);
    this.viewState = 'initial';
  }
  addVar(): void {
    this.channel.send(InfoType.Text, 'add_var ' +
      this.main.get('variable.varName').value + ' ' +
      this.main.get('variable.typeName').value);
    this.viewState = 'initial';
  }
  addSym(): void {
    this.channel.send(InfoType.Text, 'add_sym ' +
      this.main.get('sym.symName').value + ' ' +
      this.main.get('sym.arg1Type').value + ' ' +
      this.main.get('sym.retType').value);
    this.viewState = 'initial';
  }
  addAxiom(): void {
    this.channel.send(InfoType.Text, 'add_axiom ' +
      this.main.get('axiom.axiom').value);
    this.viewState = 'initial';
  }
}

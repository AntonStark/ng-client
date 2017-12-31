import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';

@Component({
  selector: 'app-inference-pane',
  templateUrl: './inference-pane.component.html',
  styleUrls: ['./inference-pane.component.css']
})
export class InferencePaneComponent {
  viewState = 'initial';

  mp: FormGroup;
  spec: FormGroup;
  gen: FormGroup;

  constructor(private fb: FormBuilder, private channel: ChannelService) {
    this.mp = fb.group({
      premise: ['', Validators.required],
      impl: ['', Validators.required]
    });
    this.spec = fb.group({
      general: ['', Validators.required],
      case: ['', Validators.required]
    });
    this.gen = fb.group({
      case: ['', Validators.required],
      var: ['', Validators.required]
    });
  }

  openMenu(): void {
    this.viewState = 'menu';
  }

  back(): void {
    if (this.viewState === 'menu')
      this.viewState = 'initial';
    else
      this.viewState = 'menu';
  }

  deduceMP(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_MP',
        this.mp.get('premise').value,
        this.mp.get('impl').value]
    });
    this.viewState = 'initial';
    return false;
  }

  deduceSpec(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_Spec',
        this.spec.get('general').value,
        this.spec.get('case').value]
    });
    this.viewState = 'initial';
    return false;
  }

  deduceGen(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_Gen',
        this.gen.get('case').value,
        this.gen.get('var').value]
    });
    this.viewState = 'initial';
    return false;
  }
}

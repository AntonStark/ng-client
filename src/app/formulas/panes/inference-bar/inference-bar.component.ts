import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../../../channel.service';
import { InfoType } from '../../../info-type.enum';

@Component({
  selector: 'app-inference-pane',
  templateUrl: './inference-bar.component.html',
  styleUrls: ['../panes.component.css']
})
export class InferenceBarComponent {
  viewState = 'menu';

  mp: FormGroup;
  spec: FormGroup;
  appl: FormGroup;
  eql: FormGroup;
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
    this.appl = fb.group({
      term: ['', Validators.required],
      theorem: ['', Validators.required]
    });
    this.eql = fb.group({
      term: ['', Validators.required],
      eql: ['', Validators.required]
    });
    this.gen = fb.group({
      case: ['', Validators.required],
      var: ['', Validators.required]
    });
  }

  defaultLayout(): void { this.viewState = 'menu'; }

  deduceMP(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_MP',
        this.mp.get('premise').value,
        this.mp.get('impl').value]
    });
    this.defaultLayout();
    return false;
  }

  deduceSpec(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_Spec',
        this.spec.get('general').value,
        this.spec.get('case').value]
    });
    this.defaultLayout();
    return false;
  }

  deduceApply(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_Apply',
        this.appl.get('term').value,
        this.appl.get('theorem').value]
    });
    this.defaultLayout();
    return false;
  }

  deduceEqual(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_Equal',
        this.eql.get('term').value,
        this.eql.get('eql').value]
    });
    this.defaultLayout();
    return false;
  }

  deduceGen(): boolean {
    this.channel.send({
      type: InfoType.Text,
      mess: ['deduce_Gen',
        this.gen.get('case').value,
        this.gen.get('var').value]
    });
    this.defaultLayout();
    return false;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../login.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  @Input() login: string;

  defaultValidators: Validators[] = [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(64)
  ];

  constructor(private fb: FormBuilder, private channel: ChannelService) {
    this.form = fb.group({
      login: ['', this.defaultValidators],
      password: ['', this.defaultValidators]
    });
  }

  signIn(form): void {
    this.channel.send(InfoType.Text,
      'logIn 0 ' +
      form.value.login + ' ' +
      form.value.password);
  }

  ngOnInit() {
    this.form.patchValue({
      'login': this.login
    });
  }

}

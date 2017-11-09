import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';
import { loginFree, passwordsMatch } from './validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', './../login.component.css'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  @Input() login: string;

  defaultValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(64)
  ];

  constructor(private fb: FormBuilder, private channel: ChannelService) {
    this.form = fb.group({
      login: ['', this.defaultValidators, loginFree(channel)],
      passwords: fb.group({
        password: ['', this.defaultValidators],
        retry:    ['', this.defaultValidators]
      }, {validator: passwordsMatch()})
    });
  }

  passwordsGroupHasError(): boolean {
    const passwords = this.form.get('passwords');
    const password = this.form.get('passwords').get('password');
    const retry = this.form.get('passwords').get('retry');
    const passwordDone = (password.dirty || password.touched);
    const retryDone = (retry.dirty || retry.touched);
    return (passwords.invalid && passwordDone && retryDone);
  }

  signUp(form: FormGroup): void {
    this.channel.send(InfoType.Text,
      'logIn 1 ' +
      form.value.login + ' ' +
      form.value.passwords.password);
  }

  ngOnInit() {
    this.form.patchValue({
      'login': this.login
    });
    if (this.login.length)
      this.form.controls.login.markAsTouched();
  }

}

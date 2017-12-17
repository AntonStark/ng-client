import { Component, OnInit, ViewChild } from '@angular/core';
import { ChannelService } from '../channel.service';
import { InfoType } from '../info-type.enum';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hasAuth = false;
  authMode = 'sign-in';
  userName = '';

  savedLogin: string = this.userName;
  @ViewChild(SignUpComponent) signUpForm;
  @ViewChild(SignInComponent) signInForm;

  serverError = {is: false, mess: ''};
  errorHandler(resp): void {
    if (resp.hasOwnProperty('login-error'))
      this.serverError = {
        is: true,
        mess: resp['login-error']
      };
  }

  initRespHandler(resp): void {
    if (resp.hasOwnProperty('user-name'))
      this.userName = resp['user-name'];
    this.hasAuth = !(this.userName === '' || this.userName === '?');
  }

  constructor(private channel: ChannelService) {}

  ngOnInit() {
    this.channel.registerHandler(InfoType.Ancillary,
      this.initRespHandler.bind(this));
    this.channel.registerHandler(InfoType.Ancillary,
      this.errorHandler.bind(this));
    this.channel.send(InfoType.Text, 'logIn');
  }

  toSignUp() {
    this.savedLogin = this.signInForm
      .form.controls.login.value;
    this.authMode = 'sign-up';
  }
  toSignIn() {
    this.savedLogin = this.signUpForm
      .form.controls.login.value;
    this.authMode = 'sign-in';
  }

  quit(): void {
    this.channel.send(InfoType.Text, 'logOut');
  }

}

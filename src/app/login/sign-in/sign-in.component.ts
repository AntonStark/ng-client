import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./../login.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  defaultValidators: Validators[] = [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(64)
  ];

  constructor(private fb: FormBuilder) {
    this.signInForm = fb.group({
      login: ['', this.defaultValidators],
      password: ['', this.defaultValidators]
    });
  }

  signIn(): void {
    console.log('signIn happen');
  }

}

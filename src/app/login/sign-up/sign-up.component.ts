import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./../login.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  defaultValidators: Validators[] = [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(64)
  ];
  passwordsMatch(): ValidatorFn {
    return (group: AbstractControl): {[key: string]: any} => {
      const password = group.get('password');
      const retry = group.get('retry');
      const valid = (password.value === retry.value);
      return (valid ? null : {'passwordMismatch': {}});
    };
  }

  constructor(private fb: FormBuilder) {
    this.signUpForm = fb.group({
      login: ['', this.defaultValidators],
      password: ['', this.defaultValidators],
      retry: ['', this.defaultValidators]
    }, {validator: this.passwordsMatch});
  }

  signUp(): void {
    console.log('signUp happen');
  }

}

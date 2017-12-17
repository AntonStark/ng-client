import { AbstractControl, AsyncValidatorFn,
  ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';

import { ChannelService } from '../../channel.service';
import { InfoType } from '../../info-type.enum';

export function loginFree(channel: ChannelService): AsyncValidatorFn {
  return (login: AbstractControl): Observable<ValidationErrors> => {
    return Observable.timer(300).switchMap(() => {
      return channel.ask({
        type: InfoType.Text,
        mess: ['logIn', login.value]
      }).then(answer => (JSON.stringify(answer.data.pop().mess) === '"0"') )
        .then(valid  => (valid ? null : {'loginBusy': {}}) );
    });
  };
}

export function passwordsMatch(): ValidatorFn {
  return (group: AbstractControl): {[key: string]: any} => {
    const password = group.get('password');
    const retry = group.get('retry');
    const valid = (password.value === retry.value);
    return (valid ? null : {'passwordMismatch': {} });
  };
}

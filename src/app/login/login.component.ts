import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasAuth = false;
  authMode = 'sign-in';
  user = '';

  constructor() {}

  ngOnInit() {
    // запросить у сервера userName
    // в обработчике либо активируем кнопки, либо
    // hasAuth = true, user = resp.userName
  }

}

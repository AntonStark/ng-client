import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { CookieService } from './cookie.service';
import { ChannelService } from './channel.service';
import { FormulaComponent } from './formulas/formula/formula.component';
import { FormulasComponent } from './formulas/formulas.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddingPaneComponent } from './formulas/panes/adding-pane/adding-pane.component';
import { InputMtComponent } from './formulas/input-mt/input-mt.component';
import { InferenceBarComponent } from './formulas/panes/inference-bar/inference-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
    FormulasComponent,
    FormulaComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    AddingPaneComponent,
    InputMtComponent,
    InferenceBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    ChannelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

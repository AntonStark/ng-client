import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { FormulasComponent } from './formulas/formulas.component';
import { CookieService } from './cookie.service';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
    FormulasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

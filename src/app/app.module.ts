import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { CookieService } from './cookie.service';
import { ChannelService } from './channel.service';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    ChannelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

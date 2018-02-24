import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatChipsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ComputationModule } from 'core/computation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatChipsModule,
    ComputationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComputationComponent } from './computation.component';

@NgModule({
  declarations: [
    ComputationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  //bootstrap: [ComputationComponent],
  exports: [ComputationComponent]
})
export class ComputationModule { }

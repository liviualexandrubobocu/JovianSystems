import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { KatexModule } from 'ng-katex';

import { ComputationComponent } from './computation.component';

@NgModule({
  declarations: [
    ComputationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    KatexModule
  ],
  providers: [],
  //bootstrap: [ComputationComponent],
  exports: [ComputationComponent]
})
export class ComputationModule { }

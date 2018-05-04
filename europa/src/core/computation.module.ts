import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { KatexModule } from 'ng-katex';

import { ComputationComponent } from './computation.component';
import { JovKatexModule } from './katex/jov.katex.module';
import { KatexComponent } from './katex/katex.component';

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
    KatexModule,
    JovKatexModule
  ],
  providers: [],
  //bootstrap: [ComputationComponent],
  exports: [ComputationComponent],
  entryComponents: [KatexComponent]
})
export class ComputationModule { }

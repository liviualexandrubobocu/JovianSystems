import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { KatexModule } from 'ng-katex';

import { KatexComponent } from './katex.component';

@NgModule({
  declarations: [
    KatexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    KatexModule,
  ],
  providers: [],
  //bootstrap: [ComputationComponent],
  exports: [KatexComponent]
})
export class JovKatexModule { }

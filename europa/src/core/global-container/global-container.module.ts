// External
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Internal
import { GlobalContainerComponent } from './global-container.component';
import { MenuModule } from 'core/user-space/menu/menu.module';
import { ComputationModule } from 'core/user-space/computation/computation.module';

@NgModule({
  declarations: [
    GlobalContainerComponent
  ],
  imports: [
    BrowserModule,
    ComputationModule,
    MenuModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [GlobalContainerComponent],
  exports: [GlobalContainerComponent],
})
export class GlobalContainerModule { }

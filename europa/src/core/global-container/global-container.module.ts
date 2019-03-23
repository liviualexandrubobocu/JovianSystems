// External
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Internal
import { MenuModule } from 'core/user-space/menu/menu.module';
import { EntryScreenComponent } from 'core/user-space/entry-screen/entry-screen.component';
import { GlobalContainerComponent } from './global-container.component';

@NgModule({
  declarations: [
    GlobalContainerComponent,
    EntryScreenComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [GlobalContainerComponent],
  exports: [GlobalContainerComponent],
})
export class GlobalContainerModule { }

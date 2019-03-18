// External
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Internal
import { MenuComponent } from './menu.component';

// Services
import { MenuService } from './menu.service';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [MenuService],
  bootstrap: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuModule { }

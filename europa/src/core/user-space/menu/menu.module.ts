// External
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    CommonModule
  ],
  providers: [MenuService],
  bootstrap: [MenuComponent],
  exports: [MenuComponent],
})
export class MenuModule { }

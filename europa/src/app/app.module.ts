// Internal
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';

// External
import { AppComponent } from './app.component';
import { CameraComponent } from 'core/user-space/camera/camera.component';
import { AttachFileComponent } from 'core/user-space/attach-file/attach-file.component';
import { HeaderComponent } from 'core/user-space/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { ComputationModule } from 'core/user-space/computation/computation.module';
import { MenuModule } from 'core/user-space/menu/menu.module';
import { EntryScreenComponent } from 'core/user-space/entry-screen/entry-screen.component';
import { KernelService } from 'core/kernel/kernel.service';
import { UserSpaceService } from 'core/user-space/user-space.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CameraComponent,
    AttachFileComponent,
    EntryScreenComponent,
  ],
  imports: [
    AppRoutingModule,
    MenuModule,
    ComputationModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    MatChipsModule,
    PlotlyModule
  ],
  providers: [KernelService, UserSpaceService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

// Internal
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material';

// External
import { AppComponent } from './app.component';
import { CameraComponent } from 'core/user-space/camera/camera.component';
import { AttachFileComponent } from 'core/user-space/attach-file/attach-file.component';

import { AppRoutingModule } from './app-routing.module';
import { ComputationModule } from 'core/user-space/computation/computation.module';
import { MenuModule } from 'core/user-space/menu/menu.module';
import { EntryScreenComponent } from 'core/user-space/entry-screen/entry-screen.component';

@NgModule({
  declarations: [
    AppComponent,
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
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

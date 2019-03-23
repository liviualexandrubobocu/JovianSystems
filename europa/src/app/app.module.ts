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
import { GlobalContainerModule } from 'core/global-container/global-container.module';
import { MenuModule } from 'core/user-space/menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    AttachFileComponent,
  ],
  imports: [
    AppRoutingModule,
    GlobalContainerModule,
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

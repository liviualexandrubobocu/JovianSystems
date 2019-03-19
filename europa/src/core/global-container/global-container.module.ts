// External
import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Internal
import { MenuModule } from 'core/user-space/menu/menu.module';
import { ComputationModule } from 'core/user-space/computation/computation.module';
import { EntryScreenComponent } from 'core/user-space/entry-screen/entry-screen.component';
import { CameraComponent } from 'core/user-space/camera/camera.component';
import { AttachFileComponent } from 'core/user-space/attach-file/attach-file.component';
import { ComputationComponent } from 'core/user-space/computation/computation.component';

const routes: Route[] = [
  {
    path: '',
    component: EntryScreenComponent
  },
  {
    path: 'computation',
    component: ComputationComponent
  },
  {
    path: 'use-your-camera',
    component: CameraComponent
  },
  {
    path: 'attach-file',
    component: AttachFileComponent
  }
];

@NgModule({
  declarations: [
    EntryScreenComponent,
    CameraComponent,
    AttachFileComponent
  ],
  imports: [
    BrowserModule,
    ComputationModule,
    MenuModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [EntryScreenComponent],
  exports: [EntryScreenComponent],
})
export class GlobalContainerModule { }

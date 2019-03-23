import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CameraComponent } from 'core/user-space/camera/camera.component';
import { AttachFileComponent } from 'core/user-space/attach-file/attach-file.component';
import { ComputationComponent } from 'core/user-space/computation/computation.component';
import { GlobalContainerComponent } from 'core/global-container/global-container.component';

const routes: Routes = [
    {
        path: '',
        component: GlobalContainerComponent
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
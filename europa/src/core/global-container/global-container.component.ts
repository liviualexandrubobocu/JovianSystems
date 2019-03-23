// External
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { ComponentUtils } from 'shared/libraries/component-utils';
import { Kernel } from 'shared/entities/kernel';

@Component({
    selector: 'app-global-container',
    templateUrl: './global-container.component.html'
})
export class GlobalContainerComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    private kernel: Kernel;

    constructor() {
        this.initKernel();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }

    private initKernel(): void {
        this.kernel = new Kernel();
    }
}
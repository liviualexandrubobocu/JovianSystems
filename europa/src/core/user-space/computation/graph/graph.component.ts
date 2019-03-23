// External
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { ComponentUtils } from 'shared/libraries/component-utils';

// Services
import { ComputationService } from '../computation.service';

@Component({
    selector: 'app-computation-graph',
    templateUrl: './graph.component.html'
})
export class ComputationGraphComponent implements OnInit, OnDestroy {

    public isShown: boolean = false;

    private subscriptions: Subscription[] = [];

    constructor(
        private computationService: ComputationService
    ) { }

    ngOnInit() {
        this.initGraph();
        this.initGraphToggling();
    }

    ngOnDestroy(){
        this.unsubscribeAll();
    }

    private initGraph(): void {

    }

    private initGraphToggling(): void {
        this.subscriptions.push(this.computationService.toggleSteps.subscribe(type => {
            this.isShown = (type === 'graph');
        }));
    }

    private unsubscribeAll(){
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }
}
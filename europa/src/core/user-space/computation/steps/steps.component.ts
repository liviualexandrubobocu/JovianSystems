// External
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { ComputationStep } from '../../../../shared/entities/computation-step';
import { ComponentUtils } from '../../../../shared/libraries/component-utils';

// Services
import { ComputationService } from '../computation.service';

@Component({
    selector: 'app-computation-steps',
    templateUrl: './steps.component.html'
})
export class ComputationStepsComponent implements OnInit {

    public computationSteps: ComputationStep[];
    private OPEN: string = 'uiOpen';
    private subscriptions: Subscription[] = [];

    constructor(private computationService: ComputationService) { }

    ngOnInit() {
        this.initSteps();
        this.initViewModelProperties();
        this.initStepsToggling();
    }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    public toggleStep(step) {
        step[this.OPEN] = !step[this.OPEN];
    }

    private initSteps(): void {
        this.computationSteps = this.computationService.steps;
    }

    private initViewModelProperties(): void {
        for (let computationStep of this.computationSteps) {
            computationStep[this.OPEN] = false;
        }
    }

    private initStepsToggling(): void {
        this.subscriptions.push(this.computationService.toggleSteps.subscribe(type => {
            this[type] = true;
        }));
    }

    private unsubscribeAll(){
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }
}
// External
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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

    @Input() computationSteps: ComputationStep[];

    public isShown: boolean = true;
    private subscriptions: Subscription[] = [];

    constructor(
        private computationService: ComputationService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    ngOnInit(){
        this.initSteps();
        this.initViewModelProperties();
        this.initStepsToggling();
    }

    public toggleStep(step) {
        step.isOpen = !step.isOpen;
    }

    private initSteps(): void {
        this.computationSteps = this.computationService.steps;
    }

    private initViewModelProperties(): void {
        for (let computationStep of this.computationSteps) {
            computationStep.isOpen = false;
        }
    }

    private initStepsToggling(): void {
        this.subscriptions.push(this.computationService.toggleSteps.subscribe(type => {
            this.isShown = (type === 'steps');
        }));
    }

    private unsubscribeAll(){
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }
}
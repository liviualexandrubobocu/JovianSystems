// External
import { Component, OnInit } from '@angular/core';

// Internal
import { NAVIGATION_ROUTES } from '../../../../shared/entities/navigation-routes';

// Services
import { ComputationService } from '../computation.service';
import { RouterService } from '../../../../shared/services/router.service';
import { UserSpaceService } from '../../../../core/user-space/user-space.service';

@Component({
    selector: 'app-computation-result',
    templateUrl: './result.component.html'
})
export class ComputationResultComponent implements OnInit {

    public buttons: any = {};
    public showComputationResultsInterface: boolean = false;

    constructor(
        private computationService: ComputationService,
        private userSpaceService: UserSpaceService,
        private routerService: RouterService
    ) { }

    ngOnInit() {
        this.initButtons();
        this.initToggleResult();
        this.showComputationResults();
    }

    toggleResult(type: string): void {
        this.computationService.toggleSteps.next(type);
    }

    navigate(): void {
        this.routerService.navigate(NAVIGATION_ROUTES.COMPUTATION);
    }

    private initButtons(): void {
        this.buttons.steps = true;
        this.buttons.graph = false;
    }

    private initToggleResult(): void {
        this.computationService.toggleSteps.subscribe((type) => {
            if (this.buttons && type) {
                this.buttons.steps = false;
                this.buttons.graph = false;
                this.buttons[type] = true;
            }
        });
    }

    private showComputationResults() {
        this.userSpaceService.showComputationResults.subscribe((showComputation) => {
            if(showComputation){
                this.showComputationResultsInterface = true;
            }
        })
    }
}
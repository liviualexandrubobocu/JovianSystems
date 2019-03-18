// External
import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// Internal
import { NAVIGATION_ROUTES } from '../../../../shared/entities/navigation-routes';

// Services
import { ComputationService } from '../computation.service';
import { RouterService } from '../../../../shared/services/router.service';

@Component({
    selector: 'app-computation-result',
    templateUrl: './computation-result.component.html'
})
export class ComputationResultComponent {

    constructor(
        private computationService: ComputationService,
        private routerService: RouterService
    ){}

    toggleResult(type: string): void {
        this.computationService.toggleSteps.next(type);
    }

    navigate(): void{
        this.routerService.navigate(NAVIGATION_ROUTES.COMPUTATION);
    }
}
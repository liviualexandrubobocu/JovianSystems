import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Internal
import { HTML_ELEMENTS } from '../../shared/entities/user-space-elements';
import { CalculatorButton } from '../../shared/entities/calculator-button';

@Injectable()
export class UserSpaceService {

    public showComputationResults: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

    generateCalculatorButton(elementId: string, interfaceSymbol: string, mathSymbol: string, cssClasses: string[]): CalculatorButton {
        return new CalculatorButton(elementId, interfaceSymbol, mathSymbol, cssClasses);
    }
}
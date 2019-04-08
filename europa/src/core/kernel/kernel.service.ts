import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Internal
import { HTML_ELEMENTS } from '../../shared/entities/user-space-elements';
import { UserSpaceService } from '../user-space/user-space.service';
import { CALCULATOR_STATES } from '../../shared/entities/calculator-states';

// Services
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class KernelService {
    public readonly classMatrix;
    public readonly device;
    public readonly state = CALCULATOR_STATES.BASIC;
    public readonly roles;
    public notifyUpdatedClassMatrix: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private CLASS_MATRIX_ENDPOINT = '../assets/class-matrix.json';

    constructor(
        private userSpaceService: UserSpaceService,
        private httpService: HttpService
    ) { }

    initClassMatrix() {
        return this.httpService.get(this.CLASS_MATRIX_ENDPOINT);
    }

    public generateElement(calculatorButtons: any, elementType: string, elementId: string): any {
        switch (elementType) {
            case HTML_ELEMENTS.CALCULATOR_BUTTON:
                let cssClasses = [];
                let interfaceSymbol = '';
                let mathSymbol = '';
                if (calculatorButtons) {
                    cssClasses = calculatorButtons[elementId].cssClasses.desktop;
                    interfaceSymbol = calculatorButtons[elementId].interfaceSymbol;
                    mathSymbol = calculatorButtons[elementId].symbol;
                }
                return this.userSpaceService.generateCalculatorButton(elementId, interfaceSymbol, mathSymbol, cssClasses);
            default:
                return;
        }
    }
}
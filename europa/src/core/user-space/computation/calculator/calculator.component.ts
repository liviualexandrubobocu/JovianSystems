// External
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'node-mathquill/build/mathquill';

//Internal
import { BASIC_OPERATIONS, MathFunctions, TrigFunctions, Digits } from '../../../../shared/index';
import { ComponentUtils } from '../../../../shared/libraries/component-utils';
import { CALCULATOR_STATES } from '../../../../shared/entities/calculator-states';
import { CALCULATOR_BUTTON_TYPES } from '../../../../shared/entities/calculator-button-types';
import { CalculatorButton } from '../../../../shared/entities/calculator-button';
import { HTML_ELEMENTS } from '../../../../shared/entities/user-space-elements';

//Services
import { HttpService } from 'shared/services/http.service';
import { KernelService } from 'core/kernel/kernel.service';
import { UserSpaceService } from 'core/user-space/user-space.service';

declare var MathQuill: any;
@Component({
    selector: 'app-computation-calculator',
    templateUrl: './calculator.component.html'
})
export class ComputationCalculatorComponent implements OnInit {

    public form: FormGroup;
    public clientX: number;
    public clientY: number;
    public host: any;
    public answerMathField;
    public resultFields: any[] = [];
    public subscriptions: Subscription[] = [];
    public expressionToSolve: string = '\\int^b_a';
    public basicStateCalculatorButtons: CalculatorButton[];
    public advancedStateCalculatorButtons: any[][];

    public calculatorType: string = CALCULATOR_STATES.ADVANCED;
    public calculatorStates: any = {};
    public TRIGONOMETRIC_FUNCTIONS = 'trigonometric';
    public MATHEMATICAL_FUNCTIONS = 'mathematic';
    public showCalculator: boolean = true;
    public clearInterfaceHighlight: boolean = false;

    private STEP_CLASS = 'step';
    private PARSER_ENDPOINT: string = 'https://localhost:44340/api/steps/';

    @ViewChild('editor') editor: ElementRef;
    @ViewChild('answerZone') answerZone: ElementRef;

    constructor(
        private kernelService: KernelService,
        private userSpaceService: UserSpaceService,
        private httpService: HttpService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.initCalculatorStates();
        this.initCalculatorButtonsLists();
        this.kernelService.notifyUpdatedClassMatrix.subscribe((classMatrixUpdated) => {
            this.initCalculator(CALCULATOR_STATES.BASIC);
            this.initCalculator(CALCULATOR_STATES.ADVANCED);
            this.initMathField();
        });
        this.showCalculatorInterface();
    }

    ngOnDestroy() {
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }

    /**
     * This method is used to initialize math editor field.
     * 
     */
    initMathField() {
        const MQ = MathQuill.getInterface(2);
        if (this.editor && this.editor.nativeElement) {
            var answerSpan = this.editor.nativeElement;
            this.setResultField(MQ, answerSpan);
        }
    }

    toggleCalculatorState() {
        this.calculatorStates[CALCULATOR_STATES.BASIC] = !this.calculatorStates[CALCULATOR_STATES.BASIC];
        this.calculatorStates[CALCULATOR_STATES.ADVANCED] = !this.calculatorStates[CALCULATOR_STATES.ADVANCED];
        this.calculatorType = (this.calculatorStates[CALCULATOR_STATES.BASIC] === false)
            ? CALCULATOR_STATES.BASIC : CALCULATOR_STATES.ADVANCED;
    }

    private initCalculatorStates() {
        this.calculatorStates[CALCULATOR_STATES.BASIC] = true;
        this.calculatorStates[CALCULATOR_STATES.ADVANCED] = false;
    }

    private initCalculatorButtonsLists() {
        this.basicStateCalculatorButtons = [];
        this.advancedStateCalculatorButtons = [];
        this.advancedStateCalculatorButtons[this.TRIGONOMETRIC_FUNCTIONS] = [];
        this.advancedStateCalculatorButtons[this.MATHEMATICAL_FUNCTIONS] = [];
    }

    private initCalculator(state: string) {
        switch (state) {
            case CALCULATOR_STATES.BASIC:
                this.initCalculatorButtons(this.basicStateCalculatorButtons, null, CALCULATOR_STATES.BASIC);
                break;
            case CALCULATOR_STATES.ADVANCED:
                this.initCalculatorButtons(this.advancedStateCalculatorButtons[this.TRIGONOMETRIC_FUNCTIONS], this.TRIGONOMETRIC_FUNCTIONS, CALCULATOR_STATES.ADVANCED);
                this.initCalculatorButtons(this.advancedStateCalculatorButtons[this.MATHEMATICAL_FUNCTIONS], this.MATHEMATICAL_FUNCTIONS, CALCULATOR_STATES.ADVANCED);
                break;
            default:
                this.initCalculatorButtons(this.basicStateCalculatorButtons, null, CALCULATOR_STATES.BASIC);
        }
    }

    private initCalculatorButtons(buttonsList: CalculatorButton[], type: null | string, state: string) {
        let calculatorButtons: CalculatorButton[] = [];
        if (this.kernelService.classMatrix &&
            this.kernelService.classMatrix.buttons) {
            calculatorButtons = (type === null) ? this.kernelService.classMatrix.buttons[state] : this.kernelService.classMatrix.buttons[state][type];
            for (let buttonId in calculatorButtons) {
                buttonsList.push(
                    this.kernelService.generateElement(calculatorButtons, HTML_ELEMENTS.CALCULATOR_BUTTON, buttonId)
                );
            }
        }
    }

    private setResultField(MQLibrary: any, answerSpan: any) {
        const _this = this;
        this.answerMathField = MQLibrary.MathField(answerSpan, {
            handlers: {
                edit: function () {
                    var enteredMath = _this.answerMathField.latex(); // Get entered math in LaTeX format
                    this.enteredSymbols = enteredMath;
                }
            }
        });
    }

    /**
     * This method is used to create new result components with dedicated math fields.
     * @param step
     */
    private initResultFields(steps: string[]) {
        const MQ = MathQuill.getInterface(2);
        if (this.answerZone && this.answerZone.nativeElement) {
            var answerSpan = this.answerZone.nativeElement;
            for (let step of steps) {

                // Create element for step
                let stepSpan = this.renderer.createElement('span');

                // Create latex based on html element
                let resultField = MQ.StaticMath(stepSpan);
                resultField.latex(step);

                // Add class to step html
                this.renderer.addClass(stepSpan, this.STEP_CLASS);

                // Attach node to DOM
                this.renderer.appendChild(answerSpan, stepSpan);
                this.resultFields.push(stepSpan);
            }
        }
    }

    /**
     * This method is used to send the request to the parser.
     */
    private getParsedInformation() {
        this.subscriptions.push(
            this.httpService.sendToParser(this.PARSER_ENDPOINT, this.answerMathField.latex()).subscribe((steps: string[]) => {
                this.clearResultField();
                this.initResultFields(steps);
            })
        );
        this.showResults();
    }

    private showResults() {
        if (this.userSpaceService.showComputationResults) {
            this.userSpaceService.showComputationResults.next(true);
        }
        this.showCalculator = false;
    }

    private clearResultField() {
        if(this.editor){
            this.renderer.setProperty(this.editor.nativeElement, 'innerHTML', '');
            this.initMathField();
        }
        this.clearInterfaceHighlight = false;
    }

    /**
     * Method used to add symbol on editable math field cursor
     * @param symbol 
     */
    private onClick(symbol) {
        switch (symbol) {
            case BASIC_OPERATIONS.EQUALS:
                this.getParsedInformation();
                this.clearInterfaceHighlight = true;
                break;
            case BASIC_OPERATIONS.CLEAR:
                this.clearResultField();
                break;
            default:
                if (this.answerMathField) {
                    this.answerMathField.write(symbol);
                }
                this.clearInterfaceHighlight = true;
        }
    }

    private showCalculatorInterface() {
        this.userSpaceService.showCalculator.subscribe((showCalculator) => {
            if (showCalculator) {
                this.showCalculator = true;
            }
        });
    }
}

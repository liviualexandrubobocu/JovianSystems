// External
import { Component, OnInit, ViewChild, ElementRef, Injector, EmbeddedViewRef, Renderer2 } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'node-mathquill/build/mathquill';

//Internal
import { Operations, MathFunctions, TrigFunctions, Digits } from '../../../../shared/index';
import { ComponentUtils } from '../../../../shared/libraries/component-utils';

//Services
import { HttpService } from 'shared/services/http.service';

declare var MathQuill: any;
@Component({
    selector: 'app-computation-calculator',
    templateUrl: './calculator.component.html'
})
export class ComputationCalculatorComponent implements OnInit {

    public form: FormGroup;
    public symbolicDictionary: any;
    public clientX: number;
    public clientY: number;
    public host: any;
    public answerMathField;
    public resultFields: any[] = [];
    public subscriptions: Subscription[] = [];
    public expressionToSolve: string = '\\int^b_a';

    private STEP_CLASS = 'step';
    private PARSER_ENDPOINT: string = 'https://localhost:44340/api/steps/';

    @ViewChild('editor') editor: ElementRef;
    @ViewChild('answerZone') answerZone: ElementRef;

    constructor(
        private httpService: HttpService,
        private renderer: Renderer2
    ) { }

    get trigFunctions() {
        return this.form.get('trigFunctions') as FormArray;
    }

    ngOnInit() {
        this.createSymbolDictionary();
        this.initializeControls();
        this.initMathField();
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
            const _this = this;
            this.answerMathField = MQ.MathField(answerSpan, {
                handlers: {
                    edit: function () {
                        var enteredMath = _this.answerMathField.latex(); // Get entered math in LaTeX format
                        this.enteredSymbols = enteredMath;
                    }
                }
            });
        }
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
     * This method is used to create symbol dictionary.
     */
    private createSymbolDictionary() {
        this.symbolicDictionary = new Object();
        this.symbolicDictionary['TrigFunctions'] = [];
        this.symbolicDictionary['Operations'] = [];
        this.symbolicDictionary['MathFunctions'] = [];

        Object.keys(TrigFunctions).filter(key => {
            if (isNaN(+key)) {
                this.symbolicDictionary['TrigFunctions'].push(TrigFunctions[key]);
            }
        });

        Object.keys(Operations).filter(key => {
            if (isNaN(+key)) {
                this.symbolicDictionary['Operations'].push(Operations[key]);
            }
        });

        Object.keys(MathFunctions).filter(key => {
            if (isNaN(+key)) {
                this.symbolicDictionary['MathFunctions'].push(MathFunctions[key]);
            }
        });
    }

    /**
     * This method is used to send the request to the parser.
     */
    private getParsedInformation() {
        this.answerMathField = '\\sin()';
        this.subscriptions.push(
            this.httpService.sendToParser(this.PARSER_ENDPOINT, this.answerMathField).subscribe((steps: string[]) => {
                this.clearResultField();
                this.initResultFields(steps);
            })
        );
    }

    private clearResultField() {
        for (let result of this.resultFields) {
            console.log(this.resultFields);
            this.renderer.removeChild(this.renderer.parentNode(result), result);
            // this.resultFields.splice(this.resultFields.indexOf(result));
        }
        this.resultFields = [];
    }

    /**
     * Method used to add symbol on editable math field cursor
     * @param symbol 
     */
    private addSymbol(symbol) {
        this.answerMathField.write(symbol);
    }

    private applyMath(mathField, mathSymbol: string) {
        mathField.write(mathSymbol);
    }

    /**
     * Aceasta metoda este creata pentru a initializa controalele pentru butoanele calculatorului.
     */
    private initializeControls() {
        this.form = new FormGroup({
            query: new FormControl('query')
        });
    }

    public selectHost(event) {
        this.host = event.path[0];
    }

}

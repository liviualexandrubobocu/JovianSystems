// External
import { Component, OnInit, ViewChild, ElementRef, Injector, EmbeddedViewRef, Renderer } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import '../../node_modules/node-mathquill/build/mathquill.js';

//Internal
import { Operations, MathFunctions, TrigFunctions, Digits } from '../shared/index';
import { ComponentUtils } from '../shared/libraries/component-utils';

//Services
import { HttpService } from 'shared/services/http.service';

declare var MathQuill: any;
@Component({
    selector: 'app-computation',
    templateUrl: './computation.component.html',
    styleUrls: ['./computation.component.css'],
})
export class ComputationComponent implements OnInit {

    public form: FormGroup;
    public symbolicDictionary: any;
    public clientX: number;
    public clientY: number;
    public host: any;
    public answerMathField;
    public resultField;
    public subscriptions: Subscription[] = [];
    public expressionToSolve: string = '\\int^b_a';

    private PARSER_ENDPOINT: string = '/parse';

    @ViewChild('editor') editor: ElementRef;

    constructor(
        private httpService: HttpService
    ) {

    }
    
    get trigFunctions() {
        return this.form.get('trigFunctions') as FormArray;
    }

    ngOnInit() {
        this.createSymbolDictionary();
        this.initializeControls();
        this.initMathField();
    }

    ngOnDestroy(){
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
     * @param results
     */
    private initResultFields(results: string[]){
        for(let result of results){
            this.applyMath(this.resultField, result);
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
    private sendRequest() {
        this.subscriptions.push(
            this.httpService.sendToParser(this.PARSER_ENDPOINT, this.answerMathField.latex()).subscribe((results: string[]) => {
                this.initResultFields(results);
            })
        );
    }

    /**
     * Method used to add symbol on editable math field cursor
     * @param symbol 
     */
    private addSymbol(symbol) {
        this.answerMathField.write(symbol);
    }

    private applyMath(mathField, mathSymbol: string){
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

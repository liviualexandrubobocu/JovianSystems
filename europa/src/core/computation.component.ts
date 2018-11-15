// External
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ApplicationRef, Injector, EmbeddedViewRef, Renderer } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';
import '../../node_modules/node-mathquill/build/mathquill.js';
//Internal

import { Operations, MathFunctions, TrigFunctions, Digits } from '../shared/index';
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

    public expressionToSolve: string = '\\int^b_a';

    @ViewChild('editor') editor: ElementRef;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private appRef: ApplicationRef,
        private injector: Injector,
        private renderer: Renderer) {

    }

    ngOnInit() {
        this.createSymbolDictionary();
        this.initializeControls();

        const MQ = MathQuill.getInterface(2);
        if(this.editor && this.editor.nativeElement){
            var answerSpan = this.editor.nativeElement;
            var answerMathField = MQ.MathField(answerSpan, {
                handlers: {
                  edit: function() {
                    var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
                  }
                }
              });

        }
    }

    get trigFunctions() {
        return this.form.get('trigFunctions') as FormArray;
    }

    createSymbolDictionary() {
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
     * Aceasta metoda este creata pentru a initializa controalele pentru butoanele calculatorului.
     */
    private initializeControls() {
        this.form = new FormGroup({
            query: new FormControl('query'),
        });
    }


    public selectHost(event) {
        this.host = event.path[0];
    }


}

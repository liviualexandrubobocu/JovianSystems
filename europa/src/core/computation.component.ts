// External
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';
import { KatexOptions } from 'ng-katex';
import { KatexComponent } from './katex/katex.component';
//Internal

import { Operations, MathFunctions, TrigFunctions, Digits } from '../shared/index';

@Component({
    selector: 'app-computation',
    templateUrl: './computation.component.html',
    styleUrls: ['./computation.component.css'],
    entryComponents: [KatexComponent]
})

export class ComputationComponent implements OnInit {

    public form: FormGroup;
    public symbolicDictionary: any;
    public clientX: number;
    public clientY: number;

    public expressionToSolve: string = '\\int^b_a';
    public options: KatexOptions = {
        displayMode: false,
    };

    @ViewChild('expressionCarrier') el: ElementRef;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {

    }

    ngOnInit() {
        this.createSymbolDictionary();
        this.initializeControls();

        console.log(this.symbolicDictionary);
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

    addSymbol(key: string, positionNode: any, subtree: string) {
        console.log(key);
        (this.el as any).innerHTML += '<ng-katex [equation]='"\\sqrt{x}"'></ng-katex>';
        this.changeDetectorRef.detectChanges();
        // (this.el as any).innerHTML +=  "<ng-katex [equation]="'\\sin'" [options]='options'></ng-katex>";
        console.log('expression to solve === ' + this.expressionToSolve);
        // this.insertAtCursor(this.el.nativeElement, key);
        // this.expressionToSolve += key;l
    }

    /**
     * Aceasta metoda este creata pentru a initializa controalele pentru butoanele calculatorului.
     */
    private initializeControls() {
        this.form = new FormGroup({
            query: new FormControl('query'),
        });
    }

    public insertAtCursor(myField, myValue) {
        //IE support
        // if (document.selection) {
        //     myField.focus();
        //     sel = document.selection.createRange();
        //     sel.text = myValue;
        // }
        //MOZILLA and others

        if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
        } else {
            myField.value += myValue;
        }
    }

    public basiteas(event) {
        console.log(event);
        this.el = event.path[0];
        console.log('elementul ======= ' + (this.el as any).innerText);

        // 1. Create a component reference from the component 
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(KatexComponent)
            .create(this.injector);

        (componentRef as any).instance.expression = '\\sqrt{x}';

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        (this.el as any).appendChild(domElem);
        this.changeDetectorRef.detectChanges();


        this.changeDetectorRef.detectChanges();

        this.clientX = event.clientX;
        this.clientY = event.clientY;
    }

    private getCaretPosition(editableDiv) {
        // var caretPos = 0,
        //   sel, range;
        // if ((document as any).selection && (document as any).selection.createRange) {
        //     el.focus();
        //     var range = document.selection.createRange();
        //     range.text = ins + range.text;
        // }
        // return caretPos;
    }

}

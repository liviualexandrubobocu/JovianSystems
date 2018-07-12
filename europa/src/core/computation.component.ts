// External
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Renderer } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';
import { KatexOptions } from 'ng-katex';
import { KatexComponent } from './katex/katex.component';
//Internal

import { Operations, MathFunctions, TrigFunctions, Digits } from '../shared/index';

@Component({
    selector: 'app-computation',
    templateUrl: './computation.component.html',
    entryComponents: [KatexComponent],
})

export class ComputationComponent implements OnInit {

    public form: FormGroup;
    public symbolicDictionary: any;
    public clientX: number;
    public clientY: number;
    public host: any;

    public expressionToSolve: string = '\\int^b_a';
    public options: KatexOptions = {
        displayMode: false,
    };

    @ViewChild('expressionCarrier') el: ElementRef;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private renderer: Renderer) {

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
        this.insertNewComponent(key);
        // (this.el as any).innerHTML +=  "<ng-katex [equation]="'\\sin'" [options]='options'></ng-katex>";
        // console.log('expression to solve === ' + this.expressionToSolve);
        // this.insertAtCursor(this.el.nativeElement, key);
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

    public insertNewComponent(expression: string) {
        // 1. Create a component reference from the component 
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(KatexComponent)
            .create(this.injector);

        (componentRef as any).instance.expression = expression;

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        
        (domElem as any).focus();

        // 4. Append DOM element to the body
        (this.host as any).appendChild(domElem);
        
        this.changeDetectorRef.detectChanges();

        this.refocusHost();
    }

    private refocusHost(){
        // console.log(this.host.children[0]);
        console.log('--------');
        // this.el.nativeElement.querySelector('app-katex').focus();

        // this.host.focus();
        // this.host.children[0].focus();
        // this.host.children[0].children[0].focus();
        // const element = this.renderer.selectRootElement('.host-carrier');
        // console.log('this is my element ===========' + element);
        
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

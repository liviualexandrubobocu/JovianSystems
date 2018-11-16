import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import '../../../node_modules/node-mathquill/build/mathquill.js';
import { ComputationUtils } from 'shared/libraries/computation-utils';

declare var MathQuill: any;
@Component({
    selector: 'app-mathquill',
    templateUrl: './mathquill.component.html'
})
export class MathquillComponent {
    @Input() symbols;
    @ViewChild('mathButton') mathButton: ElementRef;

    ngOnInit(){
        this.initMathElement();
    }

    initMathElement(){
        ComputationUtils.addSymbols(this.mathButton, this.symbols)
    }

    updateSymbol(){

    }
}
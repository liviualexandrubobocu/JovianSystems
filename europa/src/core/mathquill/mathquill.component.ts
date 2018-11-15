import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import '../../../node_modules/node-mathquill/build/mathquill.js';

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
        const MQ = MathQuill.getInterface(2);
        this.mathButton.nativeElement.innerText = this.symbols;
        MQ.StaticMath(this.mathButton.nativeElement);
    }
}
// External
import { Component, OnInit, Input, HostListener, Renderer, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { KatexOptions } from 'ng-katex';

//Internal

import { Operations, MathFunctions, TrigFunctions, ComputationTree, ComputationNode, Digits } from '../../shared/index';
import { FormArray } from '@angular/forms/src/model';

@Component({
    selector: 'app-katex',
    templateUrl: './katex.component.html',
    host : {
        'contentEditable': 'true'
    }
})

export class KatexComponent implements OnInit {

    @Input() expression: string;
    @Input() options: KatexOptions = {
        displayMode: true,
    };

    constructor(
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer){

    }
    ngOnInit() {
        console.log('Test init');
        this.elementRef.nativeElement.querySelector('span').focus();
    }

    ngAfterViewInit() {
        // OLD VERSION: this.firstNameElement.nativeElement.focus();
        console.log('+++++++++++++++++++');
        console.log(this.elementRef.nativeElement.querySelector('span'));
        this.changeDetectorRef.detectChanges();
        this.elementRef.nativeElement.querySelector('span').focus();
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus'); // NEW VERSION
    }

    ngAfterContentInit(){
        this.elementRef.nativeElement.querySelector('span').focus();
    }
}    
// External
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { KatexOptions } from 'ng-katex';

//Internal

import { Operations, MathFunctions, TrigFunctions, ComputationTree, ComputationNode, Digits } from '../../shared/index';
import { FormArray } from '@angular/forms/src/model';

@Component({
    selector: 'app-katex',
    templateUrl: './katex.component.html',
    styleUrls: ['./katex.component.css']
})

export class KatexComponent implements OnInit {

    @Input() expression: string;
    @Input() options: KatexOptions = {
        displayMode: true,
    };

    ngOnInit() {
        console.log('Test init');
    }
}    
// External
import { Component, OnInit } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';
import { KatexOptions } from 'ng-katex';
//Internal

import { Operations, MathFunctions, TrigFunctions, ComputationTree, ComputationNode, Digits } from '../shared/index';


@Component({
    selector: 'app-computation',
    templateUrl: './computation.component.html',
    styleUrls: ['./computation.component.css']
})

export class ComputationComponent implements OnInit {

    public form: FormGroup;
    public result: ComputationTree;
    public symbolicDictionary: any;

    public options: KatexOptions = {
        displayMode: false,
    };

    ngOnChanges(){
        
    }

    ngOnInit() {
        this.result = new ComputationTree('');
        this.createSymbolDictionary();
        //this.initializeControls();
        
        console.log(this.symbolicDictionary);
    }

    get trigFunctions(){
        return this.form.get('trigFunctions') as FormArray;
    }

    createSymbolDictionary(){
        this.symbolicDictionary = new Object();
        this.symbolicDictionary['TrigFunctions'] = [];
        this.symbolicDictionary['Operations'] = [];
        this.symbolicDictionary['MathFunctions'] = [];

        Object.keys(TrigFunctions).filter(key => {
            if(isNaN(+key)){
                this.symbolicDictionary['TrigFunctions'].push(TrigFunctions[key]);
            }
        });

        Object.keys(Operations).filter(key => {
            if(isNaN(+key)){
                this.symbolicDictionary['Operations'].push(Operations[key]);
            }
        });

        Object.keys(MathFunctions).filter(key => {
            if(isNaN(+key)){
                this.symbolicDictionary['MathFunctions'].push(MathFunctions[key]);
            }
        });


        console.log(JSON.stringify('symbol dictionary ====== ' + this.symbolicDictionary['SIN']));
    }
    
    addSymbol(key: string, positionNode: ComputationNode, subtree: string){

    }


    /**
     * Aceasta metoda este creata pentru a initializa controalele pentru butoanele calculatorului.
     */
    // private initializeControls() {

    //     /** initializeaza controalele pentru numere */
    //     let numberControls = [];

    //     let basicOperationsControls = this.initializeBasicOperations();
    //     let trigControls = this.initializeTrigFunctions();
    //     let mathFuncControls = this.initializeMathFunctions();
      
    //     /** initializeaza controalele pentru functii trigonometrice */

    //     this.form = new FormGroup({
    //         basicOperations: basicOperationsControls,
    //         trigFunctions: trigControls,
    //         mathFunctions: mathFuncControls
    //     });
    // }

    // private initializeBasicOperations(): FormArray {
    //     const operationsControls = new FormArray([]);
    //     let operationsKeys = Object.keys(Operations).filter(key => isNaN(+key));
    //     for (let key of operationsKeys) {
    //         operationsControls.push(new FormControl(key));
    //     }

    //     return operationsControls;
    // }

    // private initializeTrigFunctions(): FormArray {
    //     const trigControls = new FormArray([]);
    //     let trigKeys = Object.keys(TrigFunctions).filter(key => isNaN(+key));
    //     for (let key of trigKeys) {
    //         trigControls.push(new FormControl(key));
    //     }
        
    //     return trigControls;
    // }

    // private initializeMathFunctions(): FormArray {
    //     const mathFuncControls = new FormArray([]);
    //     let mathFuncKeys = Object.keys(MathFunctions).filter(key => isNaN(+key));
    //     for (let key of mathFuncKeys) {
    //         mathFuncControls.push(new FormControl(key));
    //     }

    //     return mathFuncControls;
    // }

}

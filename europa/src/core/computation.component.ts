// External
import { Component, OnInit } from '@angular/core';
import { ValidatorFn, Validator, AbstractControl, FormControl, NG_VALIDATORS, FormArray, FormGroup } from '@angular/forms';

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
    public symbolDictionary: any;

    ngOnInit() {
        this.result = new ComputationTree('');
        this.initializeControls();
        this.createSymbolDictionary();

        // console.log('trig controls ====== ' + JSON.stringify(this.form.get('trigFunctions')));
    }

    createSymbolDictionary(){
        this.symbolDictionary = new Object();
        for(let symbolicRepresentations of [TrigFunctions, MathFunctions, Operations, Digits]){
            Object.keys(symbolicRepresentations).filter(key => {
                if(isNaN(+key)){
                    this.symbolDictionary[key] = symbolicRepresentations[key];
                }
            });
        }

        // console.log(JSON.stringify('symbol dictionary ====== ' + this.symbolDictionary));
    }
    
    addSymbol(key: string, positionNode: ComputationNode, subtree: string){

    }


    /**
     * Aceasta metoda este creata pentru a initializa controalele pentru butoanele calculatorului.
     */
    private initializeControls() {

        /** initializeaza controalele pentru numere */
        let numberControls = [];

        let basicOperationsControls = this.initializeBasicOperations();
        let trigControls = this.initializeTrigFunctions();
        let mathFuncControls = this.initializeMathFunctions();
      
        /** initializeaza controalele pentru functii trigonometrice */

        this.form = new FormGroup({});
        this.form.addControl('basicOperations', basicOperationsControls);
        this.form.addControl('trigFunctions', trigControls);
        this.form.addControl('mathFuncControls', mathFuncControls);
    }

    private initializeBasicOperations(): FormArray {
        const operationsControls = new FormArray([]);
        let operationsKeys = Object.keys(Operations).filter(key => isNaN(+key));
        for (let key of operationsKeys) {
            operationsControls.push(new FormControl(key));
        }

        return operationsControls;
    }

    private initializeTrigFunctions(): FormArray {
        const trigControls = new FormArray([]);
        let trigKeys = Object.keys(TrigFunctions).filter(key => isNaN(+key));
        for (let key of trigKeys) {
            trigControls.push(new FormControl(key));
        }
        
        return trigControls;
    }

    private initializeMathFunctions(): FormArray {
        const mathFuncControls = new FormArray([]);
        let mathFuncKeys = Object.keys(MathFunctions).filter(key => isNaN(+key));
        for (let key of mathFuncKeys) {
            mathFuncControls.push(new FormControl(key));
        }

        return mathFuncControls;
    }

}

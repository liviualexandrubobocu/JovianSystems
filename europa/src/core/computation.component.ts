// External
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

//Internal

import { Operations, MathFunctions, TrigFunctions, ComputationTree, ComputationNode, Digits } from '../shared/index';
import { FormArray } from '@angular/forms/src/model';

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

        const form = new FormGroup({});
        form.addControl('basicOperations', basicOperationsControls);
        form.addControl('trigFunctions', trigControls);
        form.addControl('mathFuncControls', mathFuncControls);
        console.log('controale', form.controls);
    }

    private initializeBasicOperations(): FormGroup {
        const operationsControls = new FormGroup({});
        let operationsKeys = Object.keys(Operations).filter(key => isNaN(+key));
        for (let key of operationsKeys) {
            operationsControls.addControl(key, new FormControl(key));
        }

        return operationsControls;
    }

    private initializeTrigFunctions(): FormGroup {
        const trigControls = new FormGroup({});
        let trigKeys = Object.keys(TrigFunctions).filter(key => isNaN(+key));
        for (let key of trigKeys) {
            trigControls.addControl(key, new FormControl(key));
        }
        
        return trigControls;
    }

    private initializeMathFunctions(): FormGroup {
        const mathFuncControls = new FormGroup({});
        let mathFuncKeys = Object.keys(MathFunctions).filter(key => isNaN(+key));
        for (let key of mathFuncKeys) {
            mathFuncControls.addControl(key, new FormControl(key));
        }

        return mathFuncControls;
    }

}

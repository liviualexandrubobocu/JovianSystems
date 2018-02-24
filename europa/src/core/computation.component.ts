import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export enum Operations {
    ADD ,
    SUBTRACT,
    MULTIPLY = 2,
    DIVIDE = 3,
    NATURAL_LOGARITHM = 4
}

export enum TrigFunctions {
    SIN,
    COS,
    TAN,
    SINH,
    COSH,
    TANH,
    ASIN,
    ACOS,
    ATAN,
    ATAN2
}
@Component({
    selector: 'app-computation',
    templateUrl: './computation.component.html',
    styleUrls: ['./computation.component.css']
})

export class ComputationComponent implements OnInit {

    ngOnInit() {
        this.initializeControls();
    }

    /**
     * Aceasta metoda este creata pentru a initializa controalele pentru butoanele calculatorului.
     */
    private initializeControls() {

        /** initializeaza controalele pentru numere */
        let numberControls = [];


        let operationControls = [];
        let keys = Object.keys(Operations).filter(key => isNaN(+key));
        for(let key of keys){
            operationControls.push(new FormControl(key));
        }

        /** initializeaza controalele pentru functii trigonometrice */


        /** initializeaza controalele pentru operatii matematice */

        const form = new FormGroup({});
    }

    private executeMethod() {

    }

    private add() {

    }

    private divide() {

    }

    private multiply() {

    }


}

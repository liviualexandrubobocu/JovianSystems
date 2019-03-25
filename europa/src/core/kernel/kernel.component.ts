// External
import { Component, OnInit } from '@angular/core';

// Internal
import { KernelService } from './kernel.service';

@Component({

})
export class KernelComponent implements OnInit {
    constructor(private kernelService: KernelService) {

    }

    ngOnInit(){
        this.kernelService.initClassMatrix().subscribe((classMatrix) => {
            if(classMatrix){
                Reflect.defineProperty(this.kernelService, 'classMatrix', {value: JSON.parse(classMatrix)});
            }
        });
    }
}
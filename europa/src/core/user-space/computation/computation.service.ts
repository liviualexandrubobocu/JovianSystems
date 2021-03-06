// Internal
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// External
import { ComputationStep } from '../../../shared/entities/computation-step';

@Injectable()
export class ComputationService {

    public steps: ComputationStep[] = [];
    public toggleSteps: Subject<string> = new Subject();
    public mathQuery = '';
    public result = '';
}
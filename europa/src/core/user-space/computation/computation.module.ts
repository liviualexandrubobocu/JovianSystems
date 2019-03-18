// External
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KatexModule } from 'ng-katex';

// Internal
import { ComputationComponent } from './computation.component';
import { MathquillModule } from '../../mathquill/mathquill.module';

// Services
import { HttpService } from 'shared/services/http.service';
import { ComputationCalculatorComponent } from './calculator/calculator.component';
import { ComputationGraphComponent } from './graph/graph.component';
import { ComputationResultComponent } from './result/result.component';
import { ComputationStepsComponent } from './steps/steps.component';

@NgModule({
  declarations: [
    ComputationComponent,
    ComputationCalculatorComponent,
    ComputationGraphComponent,
    ComputationResultComponent,
    ComputationStepsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MathquillModule
  ],
  providers: [HttpService],
  bootstrap: [ComputationComponent],
  exports: [ComputationComponent],
})
export class ComputationModule { }

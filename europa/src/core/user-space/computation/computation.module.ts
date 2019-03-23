// External
import { RouterModule, Route } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Internal
import { ComputationComponent } from './computation.component';
import { MathquillModule } from '../../mathquill/mathquill.module';
import { ComputationCalculatorComponent } from './calculator/calculator.component';
import { ComputationGraphComponent } from './graph/graph.component';
import { ComputationResultComponent } from './result/result.component';
import { ComputationStepsComponent } from './steps/steps.component';

// Services
import { HttpService } from 'shared/services/http.service';
import { ComputationService } from './computation.service';
import { RouterService } from 'shared/services/router.service';

const routes: Route[] = [
  {
    path: 'computation',
    component: ComputationComponent
  }
];

@NgModule({
  declarations: [
    ComputationComponent,
    ComputationCalculatorComponent,
    ComputationGraphComponent,
    ComputationResultComponent,
    ComputationStepsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MathquillModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ComputationService,
    HttpService,
    RouterService
  ],
  bootstrap: [ComputationComponent],
  exports: [ComputationComponent],
})
export class ComputationModule { }

// External
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Internal
import { ComponentUtils } from 'shared/libraries/component-utils';

// Services
import { ComputationService } from '../computation.service';

@Component({
    selector: 'app-computation-graph',
    templateUrl: './graph.component.html'
})
export class ComputationGraphComponent implements OnInit, OnDestroy {

    public isShown: boolean = false;

    private subscriptions: Subscription[] = [];

    //https://stackoverflow.com/questions/48347425/angular-4-with-plotly
    //https://mathjs.org/examples/browser/plot.html.html
    //https://plot.ly/javascript/bar-charts/#customizing-individual-bar-colors
    //https://medium.freecodecamp.org/an-introduction-to-plotly-js-an-open-source-graphing-library-c036a1876e2e

    public graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
            { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        ],
        layout: { width: 320, height: 240, title: 'A Fancy Plot' }
    };

    constructor(
        private computationService: ComputationService
    ) { }

    ngOnInit() {
        this.initGraph();
        this.initGraphToggling();
    }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    private initGraph(): void {

    }

    private initGraphToggling(): void {
        this.subscriptions.push(this.computationService.toggleSteps.subscribe(type => {
            this.isShown = (type === 'graph');
        }));
    }

    private unsubscribeAll() {
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }
}
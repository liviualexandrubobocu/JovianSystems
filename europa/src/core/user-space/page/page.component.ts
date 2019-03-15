// External
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { ComponentUtils } from '../../../shared/libraries/component-utils';

// Services
import { PageService } from './page.service';

@Component({
    selector: 'app-page',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class PageComponent implements OnInit {

    public pageTitle: string;
    public pageContent: string;

    private subscriptions: Subscription[];

    constructor() {

    }

    ngOnInit() {
        this.getPageContent();
    }

    ngOnDestroy() {
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }

    private getPageContent(){
        
    }

}
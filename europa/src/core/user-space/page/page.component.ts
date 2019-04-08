// External
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

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

    constructor(private pageService: PageService) {

    }

    ngOnInit() {
        this.getPageContent();
    }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    private getPageContent() {
        // this.subscriptions.push(this.pageService.getContent().subscribe((page) => {
        //     this.pageTitle = page.pageTitle;
        //     this.pageContent = page.pageContent;
        // }));
    }

    private unsubscribeAll(){
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }
}
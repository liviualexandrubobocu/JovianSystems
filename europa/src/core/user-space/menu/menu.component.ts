// External
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// Internal
import { MenuItem } from '../../../shared/entities/menu-item';
import { ComponentUtils } from '../../../shared/libraries/component-utils';

// Services
import { MenuService } from './menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    @Output() themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() menuStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    public menuItems: MenuItem[] = [];
    public menuStateOpen: boolean = false;
    private subscriptions: Subscription[] = [];

    constructor(
        private menuService: MenuService
    ) { }

    ngOnInit() {
        this.getMenuItems();
    }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    public toggleMenuState(event): void {
        event.preventDefault();
        this.menuStateOpen = !this.menuStateOpen;
        this.menuStateChanged.emit(true);
    }

    public toggleTheme(event): void {
        event.preventDefault();
        this.themeChanged.emit(true);
    }

    private getMenuItems(): void {
        this.subscriptions.push(this.menuService.getMenuItems().subscribe((data) => {
            if (data && data.length > 0) {
                this.menuItems = data;
            }
        }));
    }
    
    private unsubscribeAll(){
        ComponentUtils.unsubscribeAll(this.subscriptions);
    }
}
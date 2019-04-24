import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// Internal
import { MenuItem } from '../../../shared/entities/menu-item';

// Services
import { HttpService } from '../../../shared/services/http.service';

@Injectable()
export class MenuService {

    public menuStateChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public applicationThemeChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private MENU_ENDPOINT: '/menus';

    constructor(
        private httpService: HttpService
    ) { }

    getMenuItems(): Observable<MenuItem[]> {
        return <any>this.httpService.get(this.MENU_ENDPOINT);
    }
}
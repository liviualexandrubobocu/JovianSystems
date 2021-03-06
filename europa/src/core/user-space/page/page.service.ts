import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Internal
import { Page } from '../../../shared/entities/page';

// Services
import { HttpService } from '../../../shared/services/http.service';



@Injectable()
export class PageService {

    private PAGES_ENDPOINT: '/pages';

    constructor(
        private httpService: HttpService
    ) {

    }

    getContent(): Observable<Page> {
        return <any>this.httpService.get(this.PAGES_ENDPOINT);
    }
}
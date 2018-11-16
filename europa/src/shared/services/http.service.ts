import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ) {

    }

    sendToParser(endpoint: string, mathSymbols: string) {
        return this.http.post(endpoint, mathSymbols);
    }
}
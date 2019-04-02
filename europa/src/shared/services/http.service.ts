import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ) {

    }

    sendToParser(endpoint: string, mathSymbols: string) {
        return this.http.get(endpoint);
    }

    get(endpoint: string) {
        return this.http.get(endpoint);
    }

    post(endpoint: string, data: any) {
        return this.http.post(endpoint, data);
    }

    put(endpoint: string, data: any){
        return this.http.put(endpoint, data);
    }

    delete(endpoint: string, data: any){
        return this.http.delete(endpoint, data);
    }
}
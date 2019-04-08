import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    public titleFirstPart = 'Jovian';
    public titleSecondPart = 'Systems';
  
    constructor() { }

    ngOnInit() { }
}
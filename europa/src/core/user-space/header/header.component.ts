import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    public headerLogoFirstPart = 'Jovian';
    public headerLogoSecondPart = 'Systems';
    public headerNavCalculator = 'Calculator';
    public headerNavCamera = 'Use your camera';
    public headerNavFile = 'Attach a file';
  
    constructor() { }

    ngOnInit() { }
}
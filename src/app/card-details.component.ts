import { Component, OnInit, Input } from '@angular/core';

import { Card } from './card';

@Component({
    moduleId: module.id,
    selector: 'card-details',
    templateUrl: 'card-details.component.html',
    styleUrls: ['card-details.component.css']
})


export class CardDetailsComponent implements OnInit {
    @Input('chosenCard') card: Card;

    constructor() {}

    ngOnInit() {
    }
}

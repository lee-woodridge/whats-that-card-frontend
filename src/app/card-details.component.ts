import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Card } from './card';
import { PairComponent } from './pair.component';

@Component({
    moduleId: module.id,
    selector: 'card-details',
    templateUrl: 'card-details.component.html',
    styleUrls: ['card-details.component.css'],
    directives: [PairComponent]
})


export class CardDetailsComponent implements OnInit {
    @Input('chosenCard') card: Card;
    @Output() hide = new EventEmitter();

    constructor() {}

    ngOnInit() {
    }

    emitClose() {
        this.hide.emit({});
    }
}

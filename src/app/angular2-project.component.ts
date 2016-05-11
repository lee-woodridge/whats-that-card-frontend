import { Component, OnInit } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CardsService } from './cards.service';
import { Card } from './card';

@Component({
    moduleId: module.id,
    selector: 'angular2-project-app',
    templateUrl: 'angular2-project.component.html',
    styleUrls: ['angular2-project.component.css'],
    providers: [CardsService, HTTP_PROVIDERS]
})

export class Angular2ProjectAppComponent implements OnInit{
    boxtext: string = 'input here';
    cards: Card[];
    loading: boolean = true;

    constructor(private _cardsService: CardsService) {

    }

    ngOnInit() {
        this._cardsService.getInitialCards()
            .subscribe(res => {
                this.loading = false;
                this.cards = res;
            });
    }

    change() {
        console.log(this.boxtext);
        // this._http.get("http://localhost:8080/id/" + this.boxtext)
        //     .subscribe(res => {
        //         // res = res.json();
        //         console.log(res);
        //         this.display = res.text();
        //     });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup } from '@angular/common';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { CardsService } from './cards.service';
import { Card } from './card';

@Component({
    moduleId: module.id,
    selector: 'angular2-project-app',
    templateUrl: 'angular2-project.component.html',
    styleUrls: ['angular2-project.component.css'],
    providers: [CardsService, HTTP_PROVIDERS]
})

export class Angular2ProjectAppComponent implements OnInit {
    boxtext: string = 'input here';
    cards: Card[];
    loading: boolean = true;
    form: ControlGroup;
    chosenCard: Card;

    constructor(private _cardsService: CardsService,
        private _formBuilder: FormBuilder) {
        this.form = this._formBuilder.group({
            searchTerm: []
        });
        this.form.valueChanges.debounceTime(100) // debounce so we don't spam requests.
            .subscribe(val => {
            this._cardsService.getSearchCards(val.searchTerm)
                .subscribe(res => {
                    this.cards = res;
                });
        });
    }

    ngOnInit() {
        this._cardsService.getInitialCards()
            .subscribe(res => {
                this.loading = false;
                this.cards = res;
            });
    }

    selectCard($event, card) {
        this.chosenCard = card;
        console.log($event, card);
    }

    resetCard() {
        this.chosenCard = null;
    }
}

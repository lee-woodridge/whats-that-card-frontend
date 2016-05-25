import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ControlGroup } from '@angular/common';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { CardDetailsComponent } from './card-details.component';
import { PaginationComponent } from './pager.component';
import { CardsService } from './cards.service';
import { Card } from './card';

@Component({
    moduleId: module.id,
    selector: 'angular2-project-app',
    templateUrl: 'angular2-project.component.html',
    styleUrls: ['angular2-project.component.css'],
    providers: [CardsService, HTTP_PROVIDERS],
    directives: [CardDetailsComponent, PaginationComponent]
})

export class Angular2ProjectAppComponent implements OnInit {
    @ViewChild(PaginationComponent) pager: PaginationComponent;

    boxtext: string = 'input here';
    cards: Card[];
    loading: boolean = true;
    form: ControlGroup;
    chosenCard: Card;
    total: number = 1;

    constructor(private _cardsService: CardsService,
        private _formBuilder: FormBuilder) {
        this.form = this._formBuilder.group({
            searchTerm: []
        });
        this.form.valueChanges.debounceTime(100) // debounce so we don't spam requests.
            .subscribe(val => {
                this._cardsService.getSearchCards(val.searchTerm)
                    .subscribe(res => {
                        this.pager.resetPage();
                        [this.total, this.cards] = res;
                        // console.log(this.total);
                    });
        });
    }

    ngOnInit() {
        this._cardsService.getInitialCards()
            .subscribe(res => {
                this.loading = false;
                [this.total, this.cards] = res;
            });
    }

    selectCard($event, card: Card) {
        this.chosenCard = card;
    }

    changePage($event: number) {
        console.log(this.form.value);
        this._cardsService
            .getSearchCards(this.form.value.searchTerm, $event)
            .subscribe(res => {
                [this.total, this.cards] = res;
                // console.log(this.total);
            });
    }

    resetCard() {
        this.chosenCard = null;
    }
}

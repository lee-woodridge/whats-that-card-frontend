import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Card } from './card';
import { Highlight } from './highlight';
// import { QueryBuilder } from './query-builder';

@Injectable()
export class CardsService {
    private _backendURL: string = 'http://localhost:4201/search'
    private pageSize: number = 12

    constructor(private _http: Http) {}

    resultToCards(result) : [number, Card[]] {
        let j = result.json();
        let cards = _.map(j, function(res) {
            let card: Card = res['rawCard'];
            card.highlights = res['highlights'];
            return card;
        });
        return [cards.length, cards] // TODO: get backend to return total num results and report here
    }

    getSearchCards(searchTerm: string, page: number = 0) : Observable<[number, Card[]]> {
        // console.log("search term: ", body);
        let body = JSON.stringify({
            "query": searchTerm,
            "page": page,
            "pageSize": this.pageSize
        })
        return this._http.post(this._backendURL, body)
            .map(res => {
                // console.log(res);
                let newres = this.resultToCards(res);
                // console.log(newres);
                return newres;
            });
    }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Card } from './card';
import { Highlight } from './highlight';
// import { QueryBuilder } from './query-builder';

@Injectable()
export class CardsService {
    private _backendURL: string = 'https://fathomless-chamber-99408.herokuapp.com/search'
    private pageSize: number = 12

    constructor(private _http: Http) {}

    resultToCards(result) : [number, Card[]] {
        let j = result.json();
        let cards = _.map(j['results'], function(res) {
            let card: Card = res['rawCard'];
            card.highlights = res['highlights'];
            return card;
        });
        return [j['total'], cards]
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

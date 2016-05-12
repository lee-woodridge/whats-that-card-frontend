import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Card, Mechanic } from './card';

@Injectable()
export class CardsService {
    private _elasticURL: string = 'http://localhost:9200/hs/cards'

    constructor(private _http: Http) {}

    resultToCards(result) : Card[] {
        let hits = result.json()['hits']['hits'];
        hits = _.map(hits, function(hit) {
            return hit['_source'];
        });
        return hits
    }

    getInitialCards() : Observable<Card[]> {
        return this._http.get(this._elasticURL + '/_search?q=*')
            .map(res => this.resultToCards(res))
    }

    getSearchCards(searchTerm: string) : Observable<Card[]> {
        let body = JSON.stringify({
            "query": {
                "match_phrase_prefix": {
                    "Name": searchTerm
                }
            }
        });
        console.log("search term: ", body);
        return this._http.post(this._elasticURL + '/_search', body)
            .map(res => this.resultToCards(res))
    }
}

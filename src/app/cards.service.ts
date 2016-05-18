import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Card } from './card';
import { Highlight } from './highlight';
import { QueryBuilder } from './query-builder';

@Injectable()
export class CardsService {
    private _elasticURL: string = 'http://localhost:9200/hs/cards'

    constructor(private _http: Http) {}

    resultToCards(result) : Card[] {
        let j = result.json();
        let hits = j['hits']['hits'];
        return _.map(hits, function(hit) {
            let card: Card = hit['_source'];
            // console.log(card);
            // console.log(hit['highlight']);
            if (hit['highlight']) {
                card.highlights = [];
                // console.log("in if");
                for(let key in hit['highlight']) {
                    let h: Highlight = {
                        field: key,
                        text: hit['highlight'][key][0]
                    };
                    // console.log(key, h);
                    card.highlights = card.highlights.concat(h);
                }
            }
            // console.log(card);
            return card;
        });
    }

    getInitialCards() : Observable<Card[]> {
        let collectible = {
            "filter": {
                "term": {
                    "Collectible": true
                }
            }
        }
        let body = JSON.stringify(collectible);
        return this._http.post(this._elasticURL + '/_search', body)
            .map(res => this.resultToCards(res))
    }

    getSearchCards(searchTerm: string) : Observable<Card[]> {
        if(searchTerm == "") {
            return this.getInitialCards();
        }
        let body = QueryBuilder.getMultiMatchQuery(searchTerm);
        // console.log("search term: ", body);
        return this._http.post(this._elasticURL + '/_search', body)
            .map(res => {
                let newres = this.resultToCards(res);
                // console.log(newres);
                return newres;
            });
    }
}

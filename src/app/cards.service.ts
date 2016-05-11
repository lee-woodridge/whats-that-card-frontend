import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Card, Mechanic } from './card';

@Injectable()
export class CardsService {
    private _elasticURL: string = 'http://localhost:9200/cards'

    constructor(private _http: Http) {}

    getInitialCards() : Observable<Card[]> {
        return this._http.get(this._elasticURL + '/_search?q=*')
            .map(res => {
                let hits = res.json()['hits']['hits'];
                hits = _.map(hits, function(hit) {
                    return hit['_source'];
                });
                return hits
            })
    }
}

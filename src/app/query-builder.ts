let pageSize: number = 12;

export class QueryBuilder {

    static getMultiMatchQuery(searchTerm: string, page: number = 0) : string {
        let words: string[] = searchTerm.split(' ');

        // Build the matches we'll concat together.
        let matches = [];
        for (let word of words) {
            // if(word.length > 2) {
                matches = matches.concat({
                    "multi_match": {
                        "type": "phrase_prefix",
                        "query": word,
                        "fuzziness": "AUTO",
                        "fields": [
                            "Text",
                            "Mechanics",
                            // "Flavor",
                            "PlayerClass",
                            "Type",
                            "CardSet",
                            "Name^6",
                            // "Artist",
                            "Rarity",
                            "Race"
                        ]
                    }
                });
                matches = matches.concat({
                    "multi_match": {
                        "type": "phrase_prefix",
                        "query": word,
                        "fields": [
                            "Text",
                            "Mechanics",
                            // "Flavor",
                            "PlayerClass",
                            "Type",
                            "CardSet",
                            "Name^6",
                            // "Artist",
                            "Rarity",
                            "Race"
                        ]
                    }
                });
            // }
        }

        return JSON.stringify({
            "query": {
                "filtered": {
                    "query": {
                        "bool": {
                            "should": matches
                        }
                    },
                    "filter": {
                        "term": {
                            "Collectible": true
                        }
                    }
                }
            },
            "highlight": {
                "pre_tags" : ['<em class="highlight">'],
                "post_tags" : ["</em>"],
                "fields": {
                    "Text": {
                        "type": "fvh"
                    },
                    "Mechanics": {
                        "type": "fvh"
                    },
                    // "Flavor": {
                    //     "type": "fvh"
                    // },
                    "PlayerClass": {
                        "type": "fvh"
                    },
                    "Type": {
                        "type": "fvh"
                    },
                    "CardSet": {
                        "type": "fvh"
                    },
                    "Name": {
                        "type": "fvh"
                    },
                    // "Artist": {
                    //     "type": "fvh"
                    // },
                    "Race": {
                        "type": "fvh"
                    },
                    "Rarity": {
                        "type": "fvh"
                    }
                }
            },
            "min_score": 0.01,
            "size": pageSize,
            "from": pageSize * page
        });
    }
}
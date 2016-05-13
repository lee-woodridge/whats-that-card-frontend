export class QueryBuilder {
    static getSearchQuery(searchTerm: string) : string {
        let words: string[] = searchTerm.split(' ');

        // Build the matches we'll concat together.
        let matches = [];
        for (let word of words) {
            if(word.length > 2) {
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
                            "Name^100",
                            // "Artist",
                            "Rarity",
                            "Race"
                        ]
                    }
                });
            }
        }

        return JSON.stringify({
            "query": {
                "bool": {
                    "should": matches,
                    "filter": {
                        "term": {
                            "Collectible": true
                        }
                    }
                }
            },
            "highlight": {
                "pre_tags" : ["<mark>"],
                "post_tags" : ["</mark>"],
                "fields": {
                    "Text": {
                        "type": "fvh"
                        },
                    "Mechanics": {
                        "type": "fvh"
                        },
                    // "Flavor": {
                    //     "type": "fvh"
                    //     },
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
                    //     },
                    "Race": {
                        "type": "fvh"
                        },
                    "Rarity": {
                        "type": "fvh"
                    }
                }
            }
        });
    }
}
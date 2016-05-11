export interface Mechanic {
    name: string;
}

export interface Card {
    mechanics: Mechanic[]; // needs it's own type [{"name": "Charge"},{"name": "Divine Shield"}]
    durability: number;
    locale: string;
    text: string;
    howToGet: string;
    imgGold: string;
    cost: number;
    flavor: string;
    playerClass: string;
    img: string;
    attack: number;
    health: number;
    type: string;
    collectible: boolean;
    faction: string;
    inPlayText: string;
    elite: boolean;
    howToGetGold: string;
    cardSet: string;
    name: string;
    artist: string;
    rarity: string;
    race: string;
    cardId: string;
}
export interface Carta {
    code: string;
    image: string;
    value: string;
    suit: string;
}

export interface RispostaShuffle {
    success: boolean;
    deck_id: string;
    remaining: number;
    shuffled: boolean;
}

export interface RispostaPesca {
    success: boolean;
    deck_id: string;
    remaining: number;
    cards: Carta[];
}
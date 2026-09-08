import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// tipi delle risposte api
type Carta = {
  code: string;
  image: string;
  value: string;
  suit: string;
};

type RispostaShuffle = {
  success: boolean;
  deck_id: string;
  remaining: number;
  shuffled: boolean;
};

type RispostaPesca = {
  success: boolean;
  deck_id: string;
  remaining: number;
  cards: Carta[];
};


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Blackjack</h1>

    <p>Punteggio: <strong>{{ punteggio }}</strong></p>

    <div>
      <img *ngFor="let carta of carte" [src]="carta.image" [alt]="carta.code" width="80" />
    </div>

    <div>
      <button (click)="pescaCarta()">Chiama carta</button>
      <button (click)="rimischiaMazzo()">Rimischia mazzo</button>
    </div>
  `,
})
export class App implements OnInit {



  idMazzo = '';
  punteggio = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.rimischiaMazzo();
  }
  carte: Carta[] = [];

  rimischiaMazzo(): void {
    this.http
        .get<RispostaShuffle>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .subscribe({
          next: (risposta) => {
            this.idMazzo = risposta.deck_id; // l'IDE ora suggerisce deck_id, remaining, ecc.
          },
        });
  }

  pescaCarta(): void {
    this.http
        .get<RispostaPesca>(`https://deckofcardsapi.com/api/deck/${this.idMazzo}/draw/?count=1`)
        .subscribe({
          next: (risposta) => {
            this.carte.push(risposta.cards[0]);
            this.punteggio = this.calcolaPunteggio();
          },
        });
  }

  calcolaPunteggio(): number {
    let totale = 0;
    let assi = 0;

    for (const carta of this.carte) {
      if (carta.value === 'JACK' || carta.value === 'QUEEN' || carta.value === 'KING') {
        totale += 10;
      } else if (carta.value === 'ACE') {
        assi++;
        totale += 11;
      } else {
        totale += parseInt(carta.value, 10);
      }
    }

    while (totale > 21 && assi > 0) {
      totale -= 10;
      assi--;
    }

    return totale;
  }
}
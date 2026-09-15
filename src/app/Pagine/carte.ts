import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Carta, RispostaRimischio, RispostaPesca } from '../interfacce/risposteapicarte';

@Component({
    selector: 'app-carte',
    standalone: true,
    imports: [HttpClientModule, CommonModule],
    styles: [`
      .bott {
        background-color: red;
      }
      #bt1 {
        margin-left: 1em;
      }
      .div1 {
        margin-top: 1em;
      }
    `],
    template: `
    <h2>Blackjack</h2>

    <p>Punteggio: <strong>{{ punteggio() }}</strong></p>

    <div>
      <img *ngFor="let carta of carte()" [src]="carta.image" width="150" />
    </div>

    <div class="div1">
      <button class="bott" (click)="pescaCarta()">Chiama carta</button>
      <button id="bt1" (click)="rimischiaMazzo()">Rimischia mazzo</button>
    </div>
  `,
})
export class Carte implements OnInit, OnDestroy {
    http = inject(HttpClient);

    idMazzo = signal('');
    carte = signal<Carta[]>([]);
    punteggio = signal(0);

    shuffleSubscription?: Subscription;
    pescaSubscription?: Subscription;

    ngOnInit() {
        this.rimischiaMazzo();
    }

    ngOnDestroy() {
        this.shuffleSubscription?.unsubscribe();
        this.pescaSubscription?.unsubscribe();
    }

    rimischiaMazzo() {
        this.carte.set([]);
        this.punteggio.set(0);

        this.shuffleSubscription = this.http
            .get<RispostaRimischio>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .subscribe({
                next: (risposta: RispostaRimischio) => {
                    this.idMazzo.set(risposta.deck_id);
                },
                error: (errore) => console.log('Errore nel mischiare:', errore),
            });
    }

    pescaCarta(): boolean {
        if (!this.idMazzo()) {
            return false;
        }

        this.pescaSubscription = this.http
            .get<RispostaPesca>(`https://deckofcardsapi.com/api/deck/${this.idMazzo()}/draw/?count=1`)
            .subscribe({
                next: (risposta: RispostaPesca) => {
                    const nuoveCarte = this.carte();
                    nuoveCarte.push(risposta.cards[0]);
                    this.carte.set([...nuoveCarte]);

                    this.punteggio.set(this.calcolaPunteggio());

                    if (this.punteggio() > 21) {
                        setTimeout(() => {
                            alert('Hai sballato, reimpostazione della mano');
                            this.rimischiaMazzo();
                        }, 100);
                    }
                },
                error: (errore) => console.log('Errore nella pesca:', errore),
            });
        return true;
    }

    calcolaPunteggio(): number {
        let totale = 0;
        let assi = 0;

        for (const carta of this.carte()) {
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
import 'zone.js';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Carta, RispostaShuffle, RispostaPesca } from '../interfacce/risposteapicarte';

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

    <p>Punteggio: <strong>{{ punteggio }}</strong></p>

    <div>
      <img *ngFor="let carta of carte" [src]="carta.image"  width="150" />
    </div>

    <div class="div1">
      <button class="bott" (click)="pescaCarta()">Chiama carta</button>
      <button id="bt1" (click)="rimischiaMazzo()">Rimischia mazzo</button>
    </div>
    
  `,

})
export class Carte implements OnInit, OnDestroy {
    http = inject(HttpClient);
// come uso il servizio

    idMazzo = '';
    carte: Carta[] = [];
    punteggio = 0;

    shuffleSubscription?: Subscription;
    pescaSubscription?: Subscription;

    ngOnInit() {
        this.rimischiaMazzo();
    }


    // quando ho un componente se mentre sto ricevendo la richiesto devo disiscrivermi dal flusso dati
    ngOnDestroy() {
        this.shuffleSubscription?.unsubscribe();
        this.pescaSubscription?.unsubscribe();
    }

    rimischiaMazzo() {
        this.carte = [];
        this.punteggio = 0;
        // qui dentro invece del tipo gli dovrei mettere un observable?
        this.shuffleSubscription = this.http
            .get<RispostaShuffle>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .subscribe({
                next: (risposta: RispostaShuffle) => {
                    this.idMazzo = risposta.deck_id;
                    // sparo nel signal il valore oppure uso una pipe async
                },
            });
    }

    pescaCarta() {
        console.log(' pescaCarta, idMazzo:', this.idMazzo);

        if (!this.idMazzo) {
            console.log(' esco, mazzo non pronto');
            return;
        }

        this.pescaSubscription = this.http
            .get<RispostaPesca>(`https://deckofcardsapi.com/api/deck/${this.idMazzo}/draw/?count=1`)
            .subscribe({
                next: (risposta: RispostaPesca) => {
                    console.log('risposta:', risposta);
                    this.carte.push(risposta.cards[0]);
                    this.punteggio = this.calcolaPunteggio();
                    console.log('carte in mano:', this.carte.length, 'punteggio:', this.punteggio);
                    if (this.punteggio > 21) {
                        alert("Hai sballato, reimpostazione della mano");
                        this.rimischiaMazzo();
                    }
                },
                error: (errore) => console.error('ERRORE:', errore),
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


    /*
    *
    * metodo in cui esce un alter se superiamo il 21 e viene resettata la mano
    *
    * */



}
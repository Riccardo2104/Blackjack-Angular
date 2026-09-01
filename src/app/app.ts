import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";
// https://deckofcardsapi.com/

/*
* parametri api:

deckid id del deck
deckcount quanti deck rimaSTI
https://deckofcardsapi.com/api/deck/<<new>>/draw/?count=2

remaining=true per lo shuffle

jokers_enabled=false per non far capitare


spades picche, dimands quadri cubs sono fiori
*
* */
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: ` <div>
    <h1>Blackjack Minificato</h1>

    <!-- Sezione Punteggie -->
    <div >
      <p>Punteggio: <strong>{{ punteggio }}</strong></p>
    </div>

    <!-- Area di visualizzazione delle Carte pescate -->
    <div >
      <div *ngFor="let carta of carte" >
      </div>
    </div>

    

    <!-- Bottoni di Controllo -->
    <div>
      <button (click)="chiamaCarta()" > Chiama carta</button>
      <button (click)="nuovoRound()"> Nuovo Round</button>
    </div>
  </div> `,
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
title = 'Pagina Home'
  deckId: string = '';
  carte: any[] = [];
  punteggio: number = 0;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
  chiamaCarta() {
// prima devo mischiare e poi pescare

  }
  nuovoRound(){
    // da vedere col prof
  }
}

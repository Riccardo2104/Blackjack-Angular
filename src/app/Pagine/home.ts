// pagine/home.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `<h2>Benvenuto</h2><p>In questa spa andremo a simulare quello che è un versione molto
        semplificata di un casino e
    di un gioco di carte ovvero il blackjack
    </p>
    <h3>Funzionamento</h3>
    <p>Non ci sarà il banco ma semplicemente avremo la possibilità di chiamare carta e più ci avvicineremo
    al 21 senza sballare avremo vinto se invece andremo oltre avremo perso
    </p>
    <img src="../assets/casinohome.jpg">
    
    `


    ,
})
export class Home {}
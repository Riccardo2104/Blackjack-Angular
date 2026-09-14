// pagine/contattaci.ts
import {Component, OnInit, DoCheck, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-contattaci',
    standalone: true,
    imports: [FormsModule,CommonModule],
    template: `
        <h1>Contattaci</h1>
        <p>Compilando questo form potrai contattarci per qualsiasi domanda relativa al progetto</p>
        <form #f="ngForm" (ngSubmit)="onSubmit()">

            <p>Nome</p>
            <input name="nome" [(ngModel)]="nome" placeHolder="nome" ngModel required/>

            <p>Cognome</p>
            <input name="cognome" [(ngModel)]="cognome" placeHolder="cognome" ngModel required/>

            <p>email</p>
            <input name="email" [(ngModel)]="email" placeHolder="email" ngModel required/>

            <p>Messaggio</p>

            <textarea name="messaggio" [(ngModel)]="messaggio" ngModel required></textarea>


            <button type="submit"  name="submit" [disabled]="f.status !== 'VALID'">Invia</button>


            <p *ngIf="submitted">Richiesta di contatto inviata!</p>


        </form>`,
})
export class Contattaci {
    nome = "";
    cognome = "";
    email = "";
    messaggio = "";

    submitted = false;

    onSubmit() {
        this.submitted = true;
        this.nome = "";
        this.cognome = "";
        this.email = "";
        this.messaggio = "";


    }

}
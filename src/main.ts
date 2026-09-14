import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { Home } from './app/Pagine/home';
import { Carte } from './app/Pagine/carte';
import { Contattaci } from './app/Pagine/contattaci';

bootstrapApplication(App, {
    providers: [
        provideRouter([
            { path: '', component: Home },
            { path: 'carte', component: Carte },
            { path: 'contattaci', component: Contattaci },
        ]),
    ],
});
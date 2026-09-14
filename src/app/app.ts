import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  styles: [`.active { background-color: cyan; }`],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a></li>
        <li><a routerLink="/carte" routerLinkActive="active">Carte</a></li>
        <li><a routerLink="/contattaci" routerLinkActive="active">Contattaci</a></li>
      </ul>
    </nav>

    <div>
      <router-outlet />
    </div>
  `,
})
export class App {}
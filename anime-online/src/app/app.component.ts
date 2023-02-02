import { Component } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'anime-online';


    onToggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle();
    }

    onClose(event: any, sidenav: MatSidenav) {
        if (event === true) {
            sidenav.close();
        }
    }
}

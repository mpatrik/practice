import {AfterContentInit, Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
    title = 'anime-online';

    @Input() searchInput?: string;

    constructor(private router: Router) {
    }

    ngAfterContentInit() {
        let searchbar = document.querySelector('.search-input');
        searchbar?.addEventListener('keypress', (e) => {
            // @ts-ignore
            if (e.key === 'Enter') {
                this.router.navigateByUrl('kereses/'+this.searchInput)
                    .then(() => {
                        window.location.reload();
                    });
            }
        })
    }


    onToggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle();
    }

    onClose(event: any, sidenav: MatSidenav) {
        if (event === true) {
            sidenav.close();
        }
    }
}

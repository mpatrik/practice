import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterContentInit {

    @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
    @Input() searchInput?: string;

    constructor(private router: Router) { }

    ngOnInit(): void { }

    ngAfterContentInit() {
        let searchbar = document.getElementById('search-input-mobile');
        searchbar?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.router.navigateByUrl('kereses/'+this.searchInput)
                    .then(() => {
                        window.location.reload();
                    });
            }
        });
    }


    close() {
        this.onCloseSidenav.emit(true);
    }

}

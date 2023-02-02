import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }


    close() {
        this.onCloseSidenav.emit(true);
    }

}

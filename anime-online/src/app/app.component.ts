import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {doc} from "@angular/fire/firestore";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
    title = 'anime-online';

    @Input() searchInput?: string;
    email = new FormControl('');
    password = new FormControl('');
    loggedInUser?: firebase.default.User | null;
    loginError: boolean = false;

    constructor(private router: Router,
                private authService: AuthService,
                private userService: UserService) { }

    ngOnInit() {
        this.authService.isUserLoggedIn().subscribe(user => {
            this.loggedInUser = user;
            localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        }, error => {
            console.error(error);
            localStorage.setItem('user', JSON.stringify('null'));
        });
    }

    ngAfterContentInit() {
        let searchbar = document.getElementById('search-input');
        searchbar?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.router.navigateByUrl('kereses/'+this.searchInput)
                    .then(() => {
                        window.location.reload();
                    });
            }
        });
    }

    show() {
        let userDropdown = document.querySelector('.user-dropdown');
        userDropdown?.classList.toggle('show');
    }

    login() {
        this.loginError = false;

        // @ts-ignore
        this.authService.login(this.email.value, this.password.value).then(cred => {
            this.router.navigateByUrl('/kezdolap');
        }).catch(error => {
            console.error(error);
            this.loginError = true;
        });

        let userDropdown = document.querySelector('.user-dropdown');
        userDropdown?.classList.toggle('show');
    }

    logout(_?: boolean) {
        this.authService.logout().then(() => {
            console.log('Sikeres kijelentkezés.');
        }).catch(error => {
            console.error(error);
        });
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

import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {doc} from "@angular/fire/firestore";
import {User} from "./shared/models/User";
import {AnimeService} from "./services/anime.service";

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

    user: User = {
        id: '',
        email: '',
        username: '',
        profilePic: '',
        megnezendo: [],
        tervezem: [],
        gondolkozokRajta: [],
        megneztem: [],
        kedvenc: [],
    };
    profilePic: string = '';

    constructor(private router: Router,
                private authService: AuthService,
                private userService: UserService,
                private animeService: AnimeService) { }

    ngOnInit() {
        this.authService.isUserLoggedIn().subscribe(user => {
            this.loggedInUser = user;
            localStorage.setItem('user', JSON.stringify(this.loggedInUser));
            // @ts-ignore
            this.userService.getById(user.uid).subscribe(res => {
                // @ts-ignore
                this.user = res;

                this.animeService.loadImage(this.user.profilePic).subscribe((data: any) => {
                    this.profilePic = data;
                }, (error: any) => {
                    console.error(error);
                });
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
            localStorage.setItem('user', JSON.stringify('null'));
        });
    }

    ngAfterContentInit() {
        let searchbar = document.getElementById('search-input');
        let emailInput = document.getElementById('email');
        let passwordInput = document.getElementById('password');

        searchbar?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.router.navigateByUrl('kereses/'+this.searchInput)
                    .then(() => {
                        window.location.reload();
                    });
            }
        });

        emailInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });
        passwordInput?.addEventListener('keypress', (e) => {
            console.log('test');
            if (e.key === 'Enter') this.login();
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
            console.log('Successful login.');
            window.location.reload();
        }).catch(error => {
            console.error(error);
            this.loginError = true;
        });
    }

    logout(_?: boolean) {
        this.authService.logout().then(() => {
            console.log('Sikeres kijelentkez??s.');
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

    navigateToProfil() {
        this.router.navigateByUrl('/profil').then(_ => {
            window.location.reload();
            }
        );
    }
}

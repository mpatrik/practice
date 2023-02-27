import {AfterContentInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../shared/models/User";
import {AuthService} from "../../services/auth.service";
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterContentInit {

    user: User = {
        id: '',
        email: '',
        username: '',
        megnezendo: [],
        tervezem: [],
        gondolkozokRajta: [],
        megneztem: [],
        kedvenc: [],
    };
    animes: Array<Anime> = [];

    constructor(private authService: AuthService,
                private userService: UserService,
                private animeService: AnimeService) { }

    ngOnInit(): void {
        this.authService.isUserLoggedIn().subscribe(user => {
            // @ts-ignore
            this.userService.getById(user.uid).subscribe(res => {
                // @ts-ignore
                this.user = res;


            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
    }

    ngAfterContentInit() {
        let select = document.querySelector('.categories');
        this.authService.isUserLoggedIn().subscribe((res: any) => {
            this.userService.getById(res.uid).subscribe((user: any) => {
                select?.addEventListener('change', () => {
                    let tempArray = [];
                    // @ts-ignore
                    switch (select.value) {
                        case 'megnezendo':
                            tempArray = user.megnezendo;
                            break;
                        case 'tervezem':
                            tempArray = user.tervezem;
                            break;
                        case 'gondolkozokRajta':
                            tempArray = user.gondolkozokRajta;
                            break;
                        case 'megneztem':
                            tempArray = user.megneztem;
                            break;
                        case 'kedvenc':
                            tempArray = user.kedvenc;
                            break;
                    }

                    this.animes = [];
                    for (let animeID of tempArray.sort()) {
                        this.animeService.getAnimeById(animeID).subscribe((res: any) => {
                            this.animes.push(res);
                        }, (error: any) => {
                            console.error(error);
                        });
                    }

                });


            }, (error: any) => {
                console.error(error);
            });
        }, (error: any) => {
            console.error(error);
        });
    }


    logout(_?: boolean) {
        this.authService.logout().then(() => {
            console.log('Sikeres kijelentkezés.');
        }).catch(error => {
            console.error(error);
        });
    }


}

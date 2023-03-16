import {AfterContentInit, Component, OnInit} from '@angular/core';
import {AnimeService} from "../../services/anime.service";
import {Anime} from "../../shared/models/Anime";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/models/User";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-anime-view',
    templateUrl: './anime-view.component.html',
    styleUrls: ['./anime-view.component.scss']
})
export class AnimeViewComponent implements OnInit, AfterContentInit {

    anime: Anime = {
        id: '',
        title: '',
        titleSecondary: '',
        series: '',
        introduction: '',
        type: '',
        completion: '',
        date: '',
        episodes: [],
        episodeNumber: 0,
        genres: [],
        watchMode: '',
        image: ''
    }
    image: string = '';
    relatedAnimes: Array<Anime> = [];
    completionLink: string = '';
    completionLinkContent: string = '';
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
    isUser?: firebase.default.User | null;

    constructor(private router: Router,
                private animeService: AnimeService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private userService: UserService) { }

    ngOnInit(): void {
        let id = '';
        this.activatedRoute.paramMap.subscribe((data: any) => {
            id = data.params.id;
        }, (error: any) => {
            console.log(error);
        });


        this.animeService.getAnimeById(id).subscribe((data: any) => {
            this.anime = data;
            if(!this.anime) this.router.navigateByUrl('not-found', {skipLocationChange: true});
            if (this.anime.type === 'sorozat') {
                if (this.anime.completion === 'befejezett') {
                    this.completionLink = 'befejezett_sorozatok';
                    this.completionLinkContent = 'Befejezett sorozatok';
                } else {
                    this.completionLink = 'futo_sorozatok';
                    this.completionLinkContent = 'Aktuális szériák';
                }
            } else {
                this.completionLink = 'filmek';
                this.completionLinkContent = 'Filmek';
            }

            this.animeService.getAnimesBySeries(this.anime.series).subscribe((data: any) => {
                for (let anime of data) {
                    if (anime.id !== this.anime.id) {
                        this.relatedAnimes.push(anime);
                    }
                }
            }, (error: any) => {
                console.log(error);
            });

            this.animeService.loadImage(this.anime.image).subscribe((res: any) => {
                this.image = res;
            }, (error) => {
                console.log(error);
            });

            this.authService.isUserLoggedIn().subscribe(user => {
                this.isUser = user;
                localStorage.setItem('user', JSON.stringify(this.isUser));
                // @ts-ignore
                this.userService.getById(user.uid).subscribe(res => {
                    // @ts-ignore
                    this.user = res;
                }, error => {
                    console.error(error);
                });


                let categories = document.querySelector('.categories-section');
                // @ts-ignore
                if (this.isUser) categories.style.display = 'block';

            }, error => {
                console.error(error);
                localStorage.setItem('user', JSON.stringify('null'));
            });
        }, (error: any) => {
            console.log(error);
        });

    }


    ngAfterContentInit() {
        let select = document.querySelector('.categories');
        this.authService.isUserLoggedIn().subscribe((res: any) => {
            this.userService.getById(res.uid).subscribe((user: any) => {

                let value = '';
                if (user.megnezendo.includes(this.anime.id)) {
                    value = 'megnezendo';
                } else if (user.tervezem.includes(this.anime.id)) {
                    value = 'tervezem';
                } else if (user.gondolkozokRajta.includes(this.anime.id)) {
                    value = 'gondolkozokRajta';
                } else if (user.megneztem.includes(this.anime.id)) {
                    value = 'megneztem';
                } else if (user.kedvenc.includes(this.anime.id)) {
                    value = 'kedvenc';
                }

                // @ts-ignore
                for (let item of select) {
                    if (item.value === value) {
                        item.setAttribute('selected', 'true');
                        break;
                    }
                }


                select?.addEventListener('change', () =>{
                    // @ts-ignore
                    this.userService.listsUpdate(user, this.anime.id, value, select.value);
                    let respond = document.getElementById('respond');
                    if (respond) respond.style.display = 'block';
                });


            }, (error: any) => {
                console.error(error);
            });
        }, (error: any) => {
            console.error(error);
        });

    }

}

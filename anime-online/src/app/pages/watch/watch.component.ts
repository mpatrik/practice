import { Component, OnInit } from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

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
    watchLink?: SafeResourceUrl;
    episode: number = 0;

    constructor(private animeService: AnimeService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        let id = '';
        this.activatedRoute.paramMap.subscribe((data: any) => {
            id = data.params.id;
            this.episode = Number(data.params.episode);
        }, (error: any) => {
            console.log(error);
        });

        this.animeService.getAnimeById(id).subscribe((data: any) => {
            this.anime = data;
            this.watchLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.anime.episodes[this.episode-1]);
        }, (error: any) => {
            console.log(error);
        });
    }

    navigateToEpisode(episode: number) {
        this.router.navigate(['animek/'+this.anime.id+'/'+episode])
            .then(() => {
                window.location.reload();
            });
    }

}

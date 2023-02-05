import { Component, OnInit } from '@angular/core';
import {AnimeService} from "../../services/anime.service";
import {Anime} from "../../shared/models/Anime";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-anime-view',
    templateUrl: './anime-view.component.html',
    styleUrls: ['./anime-view.component.scss']
})
export class AnimeViewComponent implements OnInit {

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

    constructor(private router: Router,
                private animeService: AnimeService,
                private activatedRoute: ActivatedRoute) { }

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
        }, (error: any) => {
            console.log(error);
        });
    }

}

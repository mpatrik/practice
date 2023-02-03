import { Component, OnInit } from '@angular/core';
import {AnimeService} from "../../services/anime.service";
import {Anime} from "../../shared/models/Anime";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-anime-view',
    templateUrl: './anime-view.component.html',
    styleUrls: ['./anime-view.component.scss']
})
export class AnimeViewComponent implements OnInit {

    anime: Anime = {
        id: '',
        title: '',
        titleEng: '',
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

    constructor(private animeService: AnimeService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        let id = '';
        this.activatedRoute.paramMap.subscribe((data: any) => {
            id = data.params.id;
        }, (error: any) => {
            console.log(error);
        });

        this.animeService.getAnimeById(id).subscribe((data: any) => {
            this.anime = data;



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

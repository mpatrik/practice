import {Component, OnInit} from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";

@Component({
    selector: 'app-animes',
    templateUrl: './animes.component.html',
    styleUrls: ['./animes.component.scss']
})
export class AnimesComponent implements OnInit {

    animes: Array<Anime> = [];
    animeSeries: Array<Anime> = [];
    animeMovies: Array<Anime> = [];

    constructor(private animeService: AnimeService) { }

    ngOnInit(): void {
        this.animeService.getAnimeSeries().subscribe((data : any) => {
            this.animeSeries = data;
        }, (error : any) => {
            console.log(error);
        });

        this.animeService.getAnimeMovies().subscribe((data : any) => {
            this.animeMovies = data;
        }, (error : any) => {
            console.log(error);
        });

    }


}

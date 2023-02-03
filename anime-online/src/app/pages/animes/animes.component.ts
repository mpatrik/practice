import { Component, OnInit } from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";

@Component({
    selector: 'app-animes',
    templateUrl: './animes.component.html',
    styleUrls: ['./animes.component.scss']
})
export class AnimesComponent implements OnInit {

    animes: Array<Anime> = [];

    constructor(private animeService: AnimeService) { }

    ngOnInit(): void {
        this.animeService.getAnimes().subscribe((data : any) => {
            this.animes = data;
        }, (error : any) => {
            console.log(error);
        });
    }

}

import { Component, OnInit } from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    animes: Array<Anime> = [];

    constructor(private animeService: AnimeService) { }

    ngOnInit(): void {
        this.animeService.getAnimes().subscribe((data: any) => {
            this.animes = data;
        }, (error: any) => {
            console.log(error);
        })
    }

}

import {Component, OnInit} from '@angular/core';
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
            for (let anime of data) {
                if (anime.series.includes('bleach') ||
                    anime.series.includes('jujutsu kaisen') ||
                    anime.series.includes('classroom of the elite') || anime.series.includes('horimiya') ||
                    anime.series.includes('your lie in april')) {
                    this.animes.push(anime);
                }
            }
        }, (error: any) => {
            console.log(error);
        });


    }
}

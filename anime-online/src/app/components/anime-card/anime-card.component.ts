import {Component, Input, OnInit} from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-anime-card',
    templateUrl: './anime-card.component.html',
    styleUrls: ['./anime-card.component.scss']
})
export class AnimeCardComponent implements OnInit {

    @Input() anime : Anime = {
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
    thumbnail: string = '';


    constructor(private router: Router, private animeService : AnimeService) { }

    ngOnInit(): void {
        this.animeService.loadImage(this.anime.image).subscribe((data : any) => {
            this.thumbnail = data;
        }, (error : any) => {
            console.log(error);
        } );
    }

}

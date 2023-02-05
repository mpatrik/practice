import { Component, OnInit } from '@angular/core';
import {AnimeService} from "../../services/anime.service";
import {ActivatedRoute} from "@angular/router";
import {Anime} from "../../shared/models/Anime";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    searchInput: string = '';
    searchResult: Array<Anime> = [];

    constructor(private animeService: AnimeService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((data: any) => {
            this.searchInput = data.params.searchInput;

        }, (error: any) => {
            console.log(error);
        });
        if (this.searchInput === 'undefined') this.searchInput = '';
        else this.searchResult = this.animeService.getAnimesBySearch(this.searchInput);
    }

}

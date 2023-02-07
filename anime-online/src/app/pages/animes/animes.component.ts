import {Component, OnInit} from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-animes',
    templateUrl: './animes.component.html',
    styleUrls: ['./animes.component.scss']
})
export class AnimesComponent implements OnInit {

    animes: Array<Anime> = [];
    animeSeries: Array<Anime> = [];
    animeMovies: Array<Anime> = [];
    completion: string = '';
    seriesTitle = 'Sorozatok';

    constructor(private animeService: AnimeService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((data: any) => {
            if (data.params.completion === 'befejezett_sorozatok') {
                this.completion = 'befejezett';
                this.seriesTitle = 'Befejezett sorozatok';
            }
            else if (data.params.completion === 'futo_sorozatok') {
                this.completion = 'folyamatban';
                this.seriesTitle = 'Aktuális szériák';
            }
            else if (data.params.completion === 'filmek') {
                this.completion = 'film';
            }
            else if (data.params.completion.length > 0) this.router.navigateByUrl('not-found', {skipLocationChange: true});
        }, (error: any) => {
            console.log(error);
        });

        if (this.completion === 'befejezett' || this.completion === 'folyamatban') {
            this.animeService.getAnimeSeriesByCompletion(this.completion).subscribe((data: any) => {
                this.animeSeries = data;
            }, (error: any) => {
                console.log(error);
            });
        } else if (this.completion === 'film') {
            this.animeService.getAnimeMovies().subscribe((data : any) => {
                this.animeMovies = data;
            }, (error : any) => {
                console.log(error);
            });
        } else {
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


}

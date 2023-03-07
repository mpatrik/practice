import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentInit {

    animes: Array<Anime> = [];
    slideIndex: number = 1;

    constructor(private animeService: AnimeService) { }

    ngOnInit(): void {
        this.animeService.getAnimes().subscribe((data: any) => {
            this.animes = [];
            for (let anime of data) {
                if (anime.series.includes('bleach') ||
                    anime.series.includes('jujutsu kaisen') ||
                    anime.series.includes('classroom of the elite') ||
                    anime.series.includes('horimiya') ||
                    anime.series.includes('your lie in april')) {
                    this.animes.push(anime);
                }
            }
        }, (error: any) => {
            console.log(error);
        });
    }

    ngAfterContentInit() {
        let slides = document.querySelectorAll('.cell');
        let radios = document.querySelectorAll('.carousel__radios button');
        setInterval(() => {
            slides[0].classList.remove('active-slide');
            slides[1].classList.remove('active-slide');
            slides[2].classList.remove('active-slide');
            slides[3].classList.remove('active-slide');
            slides[4].classList.remove('active-slide');
            slides[5].classList.remove('active-slide');
            slides[this.slideIndex].classList.add('active-slide');
            radios[0].classList.remove('active-radio');
            radios[1].classList.remove('active-radio');
            radios[2].classList.remove('active-radio');
            radios[3].classList.remove('active-radio');
            radios[4].classList.remove('active-radio');
            radios[5].classList.remove('active-radio');
            radios[this.slideIndex].classList.add('active-radio');

            if (this.slideIndex < 5) this.slideIndex++;
            else this.slideIndex = 0;
        }, 5000);
    }

    changeSlide(index: number) {
        this.slideIndex = index;
        let slides = document.querySelectorAll('.cell');
        let radios = document.querySelectorAll('.carousel__radios button');

        slides[0].classList.remove('active-slide');
        slides[1].classList.remove('active-slide');
        slides[2].classList.remove('active-slide');
        slides[3].classList.remove('active-slide');
        slides[4].classList.remove('active-slide');
        slides[5].classList.remove('active-slide');
        slides[this.slideIndex].classList.add('active-slide');
        radios[0].classList.remove('active-radio');
        radios[1].classList.remove('active-radio');
        radios[2].classList.remove('active-radio');
        radios[3].classList.remove('active-radio');
        radios[4].classList.remove('active-radio');
        radios[5].classList.remove('active-radio');
        radios[this.slideIndex].classList.add('active-radio');
    }

    previousSlide() {
        if (this.slideIndex > 0) this.slideIndex--;
        else this.slideIndex = 5;
        let slides = document.querySelectorAll('.cell');
        let radios = document.querySelectorAll('.carousel__radios button');
        slides[0].classList.remove('active-slide');
        slides[1].classList.remove('active-slide');
        slides[2].classList.remove('active-slide');
        slides[3].classList.remove('active-slide');
        slides[4].classList.remove('active-slide');
        slides[5].classList.remove('active-slide');
        slides[this.slideIndex].classList.add('active-slide');
        radios[0].classList.remove('active-radio');
        radios[1].classList.remove('active-radio');
        radios[2].classList.remove('active-radio');
        radios[3].classList.remove('active-radio');
        radios[4].classList.remove('active-radio');
        radios[5].classList.remove('active-radio');
        radios[this.slideIndex].classList.add('active-radio');
    }

    nextSlide() {
        if (this.slideIndex < 5) this.slideIndex++;
        else this.slideIndex = 0;
        let slides = document.querySelectorAll('.cell');
        let radios = document.querySelectorAll('.carousel__radios button');
        slides[0].classList.remove('active-slide');
        slides[1].classList.remove('active-slide');
        slides[2].classList.remove('active-slide');
        slides[3].classList.remove('active-slide');
        slides[4].classList.remove('active-slide');
        slides[5].classList.remove('active-slide');
        slides[this.slideIndex].classList.add('active-slide');
        radios[0].classList.remove('active-radio');
        radios[1].classList.remove('active-radio');
        radios[2].classList.remove('active-radio');
        radios[3].classList.remove('active-radio');
        radios[4].classList.remove('active-radio');
        radios[5].classList.remove('active-radio');
        radios[this.slideIndex].classList.add('active-radio');
    }
}

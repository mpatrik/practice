import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Anime} from "../shared/models/Anime";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    collectionName = 'Animes';

    constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

    getAnimes() {
        return this.afs.collection<Array<Anime>>(this.collectionName, ref => ref.orderBy('title', 'asc')).valueChanges();
    }

    getAnimeSeries() {
        return this.afs.collection<Array<Anime>>(this.collectionName, ref => ref.where('type', '==', 'sorozat').orderBy('title', 'asc')).valueChanges();
    }

    getAnimeMovies() {
        return this.afs.collection<Array<Anime>>(this.collectionName, ref => ref.where('type', '==', 'film').orderBy('title', 'asc')).valueChanges();
    }

    getAnimesBySeries(series: string) {
        return this.afs.collection<Array<Anime>>(this.collectionName, ref => ref.where('series', '==', series).orderBy('title', 'asc')).valueChanges();
    }

    getAnimeSeriesByCompletion(completion: string) {
        return this.afs.collection<Array<Anime>>(this.collectionName, ref => ref.where('type', '==', 'sorozat').where('completion', '==', completion).orderBy('title', 'asc')).valueChanges();
    }

    getAnimesBySearch(searchInput: string) {
        searchInput = searchInput.toLowerCase();
        let result: Array<Anime> = [];
        this.getAnimes().subscribe((data: any) => {
            for (let anime of data) {
                if (anime.title.toLowerCase().includes(searchInput) ||
                    anime.titleSecondary.toLowerCase().includes(searchInput) ||
                    anime.series.toLowerCase().includes(searchInput)) {
                    result.push(anime);
                }
            }
        }, (error: any) => {
            console.log(error);
        });
        return result;
    }

    getAnimeById(id: string) {
        return this.afs.doc<Anime>(this.collectionName + '/' + id).valueChanges();
    }


    loadImage(imageUrl: string | undefined) {
        return this.storage.ref(<string>imageUrl).getDownloadURL();
    }
}

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

    getAnimeById(id: string) {
        return this.afs.doc<Anime>(this.collectionName + '/' + id).valueChanges();
    }

    loadImage(imageUrl: string | undefined) {
        return this.storage.ref(<string>imageUrl).getDownloadURL();
    }
}

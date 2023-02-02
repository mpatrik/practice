import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Anime} from "../shared/models/Anime";

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    collectionName = 'Animes';

    constructor(private afs: AngularFirestore) { }

    getAnimes() {
        return this.afs.collection<Array<Anime>>(this.collectionName, ref => ref.orderBy('title', 'asc')).valueChanges();
    }
}

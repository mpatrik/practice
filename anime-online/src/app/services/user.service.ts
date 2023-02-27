import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../shared/models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    collectionName = 'Users';

    constructor(private afs: AngularFirestore) { }

    create(user: User) {
        return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
    }

    getById(id: string) {
        return this.afs.doc<User>(this.collectionName + '/' + id).valueChanges();
    }







}

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

    listsUpdate(user: User, animeID: string, oldList: string, newList: string) {
        let uid = user.id;
        if (!newList) {
            if (user.megnezendo.indexOf(animeID) !== -1) user.megnezendo.splice(user.megnezendo.indexOf(animeID), 1);
            if (user.tervezem.indexOf(animeID) !== -1) user.tervezem.splice(user.tervezem.indexOf(animeID), 1);
            if (user.gondolkozokRajta.indexOf(animeID) !== -1) user.gondolkozokRajta.splice(user.gondolkozokRajta.indexOf(animeID), 1);
            if (user.megneztem.indexOf(animeID) !== -1) user.megneztem.splice(user.megneztem.indexOf(animeID), 1);
            if (user.kedvenc.indexOf(animeID) !== -1) user.kedvenc.splice(user.kedvenc.indexOf(animeID), 1);
            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                megnezendo: user.megnezendo,
                tervezem: user.tervezem,
                gondolkozokRajta: user.gondolkozokRajta,
                megneztem: user.megneztem,
                kedvenc: user.kedvenc,
            });
        } else {
            switch (oldList) {
                case '':
                    switch (newList) {
                        case 'megnezendo':
                            user.megnezendo.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megnezendo: user.megnezendo,
                            });
                            break;
                        case 'tervezem':
                            user.tervezem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                tervezem: user.tervezem,
                            });
                            break;
                        case 'gondolkozokRajta':
                            user.gondolkozokRajta.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                gondolkozokRajta: user.gondolkozokRajta,
                            });
                            break;
                        case 'megneztem':
                            user.megneztem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megneztem: user.megneztem,
                            });
                            break;
                        case 'kedvenc':
                            user.kedvenc.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                kedvenc: user.kedvenc,
                            });
                            break;
                    }
                    break;
                case 'megnezendo':
                    user.megnezendo.splice(user.megnezendo.indexOf(animeID), 1);
                    this.afs.doc<User>(this.collectionName + '/' + uid).update({
                        megnezendo: user.megnezendo,
                    });
                    switch (newList) {
                        case 'tervezem':
                            user.tervezem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                tervezem: user.tervezem,
                            });
                            break;
                        case 'gondolkozokRajta':
                            user.gondolkozokRajta.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                gondolkozokRajta: user.gondolkozokRajta,
                            });
                            break;
                        case 'megneztem':
                            user.megneztem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megneztem: user.megneztem,
                            });
                            break;
                        case 'kedvenc':
                            user.kedvenc.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                kedvenc: user.kedvenc,
                            });
                            break;
                    }
                    break;
                case 'tervezem':
                    user.tervezem.splice(user.tervezem.indexOf(animeID), 1);
                    this.afs.doc<User>(this.collectionName + '/' + uid).update({
                        tervezem: user.tervezem,
                    });
                    switch (newList) {
                        case 'megnezendo':
                            user.megnezendo.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megnezendo: user.megnezendo,
                            });
                            break;
                        case 'gondolkozokRajta':
                            user.gondolkozokRajta.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                gondolkozokRajta: user.gondolkozokRajta,
                            });
                            break;
                        case 'megneztem':
                            user.megneztem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megneztem: user.megneztem,
                            });
                            break;
                        case 'kedvenc':
                            user.kedvenc.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                kedvenc: user.kedvenc,
                            });
                            break;
                    }
                    break;
                case 'gondolkozokRajta':
                    user.gondolkozokRajta.splice(user.gondolkozokRajta.indexOf(animeID), 1);
                    this.afs.doc<User>(this.collectionName + '/' + uid).update({
                        gondolkozokRajta: user.gondolkozokRajta,
                    });
                    switch (newList) {
                        case 'megnezendo':
                            user.megnezendo.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megnezendo: user.megnezendo,
                            });
                            break;
                        case 'tervezem':
                            user.tervezem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                tervezem: user.tervezem,
                            });
                            break;
                        case 'megneztem':
                            user.megneztem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megneztem: user.megneztem,
                            });
                            break;
                        case 'kedvenc':
                            user.kedvenc.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                kedvenc: user.kedvenc,
                            });
                            break;
                    }
                    break;
                case 'megneztem':
                    user.megneztem.splice(user.megneztem.indexOf(animeID), 1);
                    this.afs.doc<User>(this.collectionName + '/' + uid).update({
                        megneztem: user.megneztem,
                    });
                    switch (newList) {
                        case 'megnezendo':
                            user.megnezendo.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megnezendo: user.megnezendo,
                            });
                            break;
                        case 'tervezem':
                            user.tervezem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                tervezem: user.tervezem,
                            });
                            break;
                        case 'gondolkozokRajta':
                            user.gondolkozokRajta.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                gondolkozokRajta: user.gondolkozokRajta,
                            });
                            break;
                        case 'kedvenc':
                            user.kedvenc.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                kedvenc: user.kedvenc,
                            });
                            break;
                    }
                    break;
                case 'kedvenc':
                    user.kedvenc.splice(user.kedvenc.indexOf(animeID), 1);
                    this.afs.doc<User>(this.collectionName + '/' + uid).update({
                        kedvenc: user.kedvenc,
                    });
                    switch (newList) {
                        case 'megnezendo':
                            user.megnezendo.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megnezendo: user.megnezendo,
                            });
                            break;
                        case 'tervezem':
                            user.tervezem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                tervezem: user.tervezem,
                            });
                            break;
                        case 'gondolkozokRajta':
                            user.gondolkozokRajta.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                gondolkozokRajta: user.gondolkozokRajta,
                            });
                            break;
                        case 'megneztem':
                            user.megneztem.push(animeID)
                            this.afs.doc<User>(this.collectionName + '/' + uid).update({
                                megneztem: user.megneztem,
                            });
                            break;
                    }
                    break;
            }
        }
    }





}

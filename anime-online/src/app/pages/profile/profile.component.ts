import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../shared/models/User";
import {AuthService} from "../../services/auth.service";
import {Anime} from "../../shared/models/Anime";
import {AnimeService} from "../../services/anime.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: User = {
        id: '',
        email: '',
        username: '',
        megnezendo: [],
        tervezem: [],
        gondolkozokRajta: [],
        megneztem: [],
        kedvenc: [],
    };
    animes: Array<Anime> = [];
    file: any = {};
    profilePic: string = '';

    constructor(private authService: AuthService,
                private userService: UserService,
                private animeService: AnimeService,
                private storage: AngularFireStorage,
                private afs: AngularFirestore) { }

    ngOnInit(): void {
        this.authService.isUserLoggedIn().subscribe(user => {
            // @ts-ignore
            this.userService.getById(user.uid).subscribe(res => {
                // @ts-ignore
                this.user = res;

                this.animeService.loadImage(this.user.profilePic).subscribe((data: any) => {
                    this.profilePic = data;
                }, (error: any) => {
                    console.error(error);
                });
            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });

    }


    selectList() {
        let select = document.querySelector('.categories');
        let user = this.user;
        let tempArray: any[] = [];
        // @ts-ignore
        switch (select.value) {
            case 'megnezendo':
                tempArray = user.megnezendo;
                break;
            case 'tervezem':
                tempArray = user.tervezem;
                break;
            case 'gondolkozokRajta':
                tempArray = user.gondolkozokRajta;
                break;
            case 'megneztem':
                tempArray = user.megneztem;
                break;
            case 'kedvenc':
                tempArray = user.kedvenc;
                break;
        }

        this.animes = [];
        for (let animeID of tempArray.sort()) {
            this.animeService.getAnimeById(animeID).subscribe((res: any) => {
                this.animes.push(res);
            }, (error: any) => {
                console.error(error);
            });
        }

    }


    logout(_?: boolean) {
        this.authService.logout().then(() => {
            console.log('Sikeres kijelentkezés.');
        }).catch(error => {
            console.error(error);
        });
    }


    updateProfilePic(event: any) {
        this.file = event.target.files[0];
        let upload = document.querySelector('.upload-img');
        upload?.classList.toggle('upload-active');
        let formats = ['jpg', 'jpeg', 'png', 'svg', 'webp'];
        let format = this.file.name.split('.')[1];
        if (!formats.includes(format.toLowerCase())) {
            console.error('Wrong format.');
            let wrongFormat = document.getElementById('wrong-format');
            if (wrongFormat) wrongFormat.style.display = 'block';
            return;
        }
        let filename = this.user.id + '.jpg';

        this.storage.upload('profilepics/' + filename, this.file);
        this.afs.doc<User>('Users/' + this.user.id).update({
            profilePic: 'profilepics/' + filename,
        });
    }

    reloadPage() {
        window.location.reload();
    }


}

import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../shared/models/User";
import {AuthService} from "../../services/auth.service";

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
        profilePic: '',
        megnezendo: [],
        tervezem: [],
        gondolkozokRajta: [],
        megneztem: [],
        kedvenc: [],
    };

    constructor(private authService: AuthService,
                private userService: UserService) { }

    ngOnInit(): void {
        this.authService.isUserLoggedIn().subscribe(user => {
            // @ts-ignore
            this.userService.getById(user.uid).subscribe(res => {
                // @ts-ignore
                this.user = res;






            }, error => {
                console.error(error);
            });
        }, error => {
            console.error(error);
        });
    }


}

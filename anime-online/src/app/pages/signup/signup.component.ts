import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../shared/models/User";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signUpForm = new FormGroup({
        email: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
        rePassword: new FormControl(),
    });
    emailFormat: boolean = true;
    passwordMatch: boolean = true;
    passwordLength: boolean = true;

    constructor(private router: Router,
                private authService: AuthService,
                private userService: UserService
                ) { }

    ngOnInit(): void { }


    onSubmit() {
        this.emailFormat = true;
        this.passwordMatch = true;
        this.passwordLength = true;
        if (this.signUpForm.get('password')?.value && this.signUpForm.get('rePassword')?.value && this.signUpForm.get('email')?.value && this.signUpForm.get('username')?.value &&
            this.signUpForm.get('password')?.value === this.signUpForm.get('rePassword')?.value && this.signUpForm.get('email')?.value.split('@').length === 2) {
            this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
                const user: User = {
                    id: cred.user?.uid as string,
                    email: this.signUpForm.get('email')?.value,
                    username: this.signUpForm.get('username')?.value,
                    profilePic: '../../../assets/basic_profile.jpg',
                    megnezendo: [],
                    tervezem: [],
                    gondolkozokRajta: [],
                    megneztem: [],
                    kedvenc: []
                }

                this.userService.create(user).then(_ => {
                    console.log('User added successfully.');
                }).catch(error => {
                    console.error(error);
                });

                this.router.navigateByUrl('/kezdolap');
            }).catch(error => {
                console.error(error);
            });
        } else {
            if (this.signUpForm.get('password')?.value.length < 8) {
                this.passwordLength = false;
                console.error('Short password');
            } else if (this.signUpForm.get('password')?.value !== this.signUpForm.get('rePassword')?.value) {
                this.passwordMatch = false;
                console.error('Passwords are unmatched.');
            }
            if (this.signUpForm.get('email')?.value.split('@').length !== 2 ) {
                this.emailFormat = false;
                console.error('Badly formatted email.');
            }
        }
    }
}

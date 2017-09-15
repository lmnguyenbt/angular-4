import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../authenticate/user.service';

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    authType: String = '';
    isSubmitting = false;
    error = '';

    constructor( private router: Router, private userService: UserService ) { }

    ngOnInit(): void {
        console.log("Login component initialized ...");
        /*this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
            // add form control for username if this is the register page
            if (this.authType === 'register') {
                this.authForm.addControl('username', new FormControl());
            }
        });*/
    }

    submitForm() {
        this.isSubmitting = true;

        //const credentials = this.authForm.value;
        this.userService.attemptAuth(this.authType, this.model)
            .subscribe(
                data => {
                    // Save user data to localstoge

                    // Route to Dashboard
                    this.router.navigateByUrl('/dashboard');
                },
                err => {
                    this.isSubmitting = false;
                }
        );
    }
}

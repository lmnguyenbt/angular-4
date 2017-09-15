import { Component, OnInit } from '@angular/core';

import { UserService } from './authenticate/user.service';

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit {

    constructor ( private userService: UserService ) { }

    ngOnInit() {
        this.userService.populate();
    }
}

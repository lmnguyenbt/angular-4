import { Component, OnInit } from '@angular/core';

// Idle
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

// Authen service
import { JwtService } from './authenticate/jwt.service';
import { UserService } from './authenticate/user.service';

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<router-outlet></router-outlet>'
})

export class AppComponent implements OnInit {
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;

    constructor ( private jwtService: JwtService, private idle: Idle, private keepalive: Keepalive, private userService: UserService ) {
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(30);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(10);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            console.log(this.idleState);
            this.userService.populate();
        });

        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.reset();
    }

    ngOnInit() {
        this.userService.populate();
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../commons/api.service';
import { JwtService } from './jwt.service';
import { User } from './user.model';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>( new User() );
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>( 1 );
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor( private apiService:ApiService,
                 private http:Http, private router: Router,
                 private jwtService:JwtService ) {}

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            this.apiService.read('/user')
                .subscribe(
                    data => this.setAuth(data.results),
                    err => this.purgeAuth()
            );
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(results) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(results.token);
        // Set current user data into observable
        this.currentUserSubject.next(results.info);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(new User());
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
        // Redirect to login
        this.router.navigateByUrl('/login');
    }

    attemptAuth(type, credentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.create('/auth/login', credentials)
            .map(
                data => {
                this.setAuth(data.results);
                return data;
            }
        );
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }
}

import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { JwtService } from '../authenticate/jwt.service';

@Injectable()
export class ApiService {
    constructor( private http: Http, private jwtService:JwtService ) { }

    private setHeaders():Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if( this.jwtService.getToken() ) {
            headersConfig[ 'Authorization' ] = `Token ${this.jwtService.getToken()}`;
        }
        return new Headers( headersConfig );
    }

    read( path:string, params:URLSearchParams = new URLSearchParams() ):Observable<any> {
        return this.http.get(
            `${environment.api_url}${path}`,
            { headers: this.setHeaders(), search: params })
            .catch( this.handleError )
            .map( ( res:Response ) => res.json() );
    }

    update( path:string, body:Object = {} ):Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify( body ),
            { headers: this.setHeaders() })
            .catch( this.handleError )
            .map( ( res:Response ) => res.json() );
    }

    create( path:string, body:Object = {} ):Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            JSON.stringify( body ),
            { headers: this.setHeaders() })
            .catch( this.handleError )
            .map( ( res:Response ) => res.json() );
    }

    delete( path ):Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`,
            { headers: this.setHeaders() })
            .catch( this.handleError )
            .map( ( res:Response ) => res.json() );
    }

    // Handle Error
    private handleError( error:Response | any ) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg:string;
        if( error instanceof Response ) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify( body );
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error( errMsg );
        return Observable.throw( errMsg );
    }
}

import { Injectable } from '@angular/core';
import {Headers, Http,RequestOptions, Response } from '@angular/http';
import {ApiService} from '../../../commons/api.service';

@Injectable()
export class TableServices {

    constructor( private $http:Http,
                 private ApiService:ApiService ) {
    }

    getAll( param ) {
        var url = '/supplier/60/item/list';
        return this.ApiService.read( url, param );
    }
}

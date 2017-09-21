import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../commons/loader.service';

import {TableServices} from './tables.service';

@Component({
    templateUrl: 'tables.component.html',
    providers: [ TableServices ]
})
export class TablesComponent implements OnInit {
    options : any = {};
    result : any = {};
    itemPerPageOptions = [15, 30];
    userList = [];
    pagination = {
        totalItems: 0,
        total_page: 0,
        currentPage: 1,
        itemsPerPage: 0
    };

    constructor(private loader: LoaderService, private tableServices : TableServices) { }

    ngOnInit(): void {
        console.log("Tables component initialized ...");
        this.resetOptions();
        this.loadPage(1);
    }

    resetOptions() {
        this.options = {
            order: 'sku',
            sort: 'desc',
            limit: this.itemPerPageOptions[0],
            page: 1
        }
    }

    loadPage(page?: any) {
        this.loader.display(true);

        if (typeof(page) != undefined)
            this.options.page = page;
        let params = this.options;
        this.tableServices.getAll(params)
            .subscribe(
                result => {
                    this.loader.display(false);

                    this.userList = result.results.rows;
                    this.pagination.totalItems = result.results.total_record;
                    this.pagination.currentPage = result.results.page;
                    this.pagination.itemsPerPage = result.results.length;
            }, error => {
                this.loader.display(false);
            })
    }

    pageChange($event) {
        this.loadPage($event);
    }

    onItemChange(limit) {
        this.loadPage(this.options.page);

    }
}

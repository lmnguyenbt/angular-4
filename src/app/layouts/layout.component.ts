import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../commons/loader.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit {
    public disabled = false;
    public status: {isopen: boolean} = {isopen: false};

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    showLoader: boolean;

    constructor(private loader: LoaderService) {}

	ngOnInit(): void {
        this.loader.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CommonModule, NgClass} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

import { TablesComponent } from './tables/tables.component';

// Components Routing
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgxPaginationModule,
        ComponentsRoutingModule
    ],
    declarations: [
        TablesComponent
    ]
})
export class ComponentsModule { }

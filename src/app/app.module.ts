import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Idle / npm install --save @ng-idle/core @ng-idle/keepalive angular2-moment
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

// Loader CSS  (https://plnkr.co/edit/I3MoLhxz1NO9PVtMTiaH?p=preview)
import { LoadersCssModule } from 'angular2-loaders-css';
import { LoadingModule } from 'ngx-loading'; // need use

// Paging
import {NgxPaginationModule} from 'ngx-pagination';

// App Component
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { SingleLayoutComponent } from './layouts/single-layout.component';

// Common
import { LoaderService } from './commons/loader.service';

// Shared Component
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { AsideComponent } from './shared/aside/aside.component';
import { FooterComponent } from './shared/footer/footer.component';

// Authenticate
import { AuthGuard } from './authenticate/auth-guard.service';
import { NoAuthGuard } from './authenticate/no-auth-guard.service';
import { JwtService } from './authenticate/jwt.service';
import { UserService } from './authenticate/user.service';

// Api Service
import { ApiService } from './commons/api.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        MomentModule,
        NgIdleKeepaliveModule.forRoot(),
        LoadersCssModule,
        LoadingModule,
        NgxPaginationModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        SingleLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        HeaderComponent,
        SideBarComponent,
        AsideComponent,
        BreadcrumbComponent,
        FooterComponent
    ],
    providers: [
        ApiService,
        AuthGuard,
        NoAuthGuard,
        JwtService,
        UserService,
        LoaderService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

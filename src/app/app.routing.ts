import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { SingleLayoutComponent } from './layouts/single-layout.component';

// Authentication
import { AuthGuard } from './authenticate/auth-guard.service';
import { NoAuthGuard } from './authenticate/no-auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            title: 'Dashboard'
        },
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
            },
        ]
    },
    {
        path: '',
        component: SingleLayoutComponent,
        data: {
            title: 'Login'
        },
        children: [
            {
                path: 'login',
                canActivate: [NoAuthGuard],
                loadChildren: './modules/login/login.module#LoginModule',
            }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

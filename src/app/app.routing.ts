import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { LayoutComponent } from './layouts/layout.component';

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
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
            },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

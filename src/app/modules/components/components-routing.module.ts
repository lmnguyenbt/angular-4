import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Components'
        },
        children: [
            {
                path: 'tables',
                component: TablesComponent,
                data: {
                    title: 'Tables'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule {}

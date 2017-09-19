import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        FormsModule,
        LoginRoutingModule,
        LoadingModule
    ],
    declarations: [ LoginComponent ]
})
export class LoginModule { }

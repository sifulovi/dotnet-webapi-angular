import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DepartmentComponent} from './department/department.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeListComponent} from './employee/employee-list/employee-list.component';
import {DepartmentListComponent} from './department/department-list/department-list.component';
import {CommonService} from './common.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        DepartmentComponent,
        EmployeeComponent,
        EmployeeListComponent,
        DepartmentListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

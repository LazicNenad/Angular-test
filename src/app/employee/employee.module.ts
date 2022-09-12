import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './components/employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { PieChartEmployeesComponent } from './components/pie-chart-employees/pie-chart-employees.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    PieChartEmployeesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    EmployeesComponent
  ]
})
export class EmployeeModule { }

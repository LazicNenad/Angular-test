import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts/public_api';
import { MS_TO_HOURS_RATIO } from '../../constants/ms-to-hours-ration';
import { IEmployeeApi } from '../../interfaces/i-employee-api';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-pie-chart-employees',
  templateUrl: './pie-chart-employees.component.html',
  styleUrls: ['./pie-chart-employees.component.css']
})
export class PieChartEmployeesComponent implements OnInit {

  employees: IEmployeeApi[] = [];

  chartSeries: ApexNonAxisChartSeries = [];

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  }

  chartLabels: string[] = [];

  chartTitle: ApexTitleSubtitle = {
    text: 'Empoloyees Workhours',
    align: 'center',
  }


  constructor(
    private employeeService: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = this.employeeService.getReducedEmployees(data);

        var sum = this.employees.reduce((accumulator, object) => {
          return (accumulator + object.time);
        }, 0)


        this.chartSeries = this.employees.map(x => {
          return ((x.time / sum) * 100);
        })

        this.chartLabels = this.employees.map(x => x.EmployeeName != null ? x.EmployeeName : "Unknown Employee");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}

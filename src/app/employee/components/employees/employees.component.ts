import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IEmployeeApi } from '../../interfaces/i-employee-api';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  employeesForTable: IEmployeeApi[] = [];
  displayedColumns: string[] = ['employeeName', 'time', 'actions'];
  dataSource = new MatTableDataSource<IEmployeeApi>(this.employeesForTable);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employeesForTable = this.employeeService.getReducedEmployees(data);

        // var uniqueEmployeeArray = [... new Set(this.employeesApi.map(x => x.EmployeeName))];

        // var workingHoursPerEmployeeArray: number[] = this.getWorkingHoursPerEmployee(uniqueEmployeeArray, this.employeesApi);

        // var employeesDisplay = this.mergeTwoArrays(uniqueEmployeeArray, workingHoursPerEmployeeArray);

        this.orderArrayByWorkingHours(this.employeesForTable);
        this.dataSource.data = this.employeesForTable;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  orderArrayByWorkingHours(array: IEmployeeApi[]): void {
    array.sort((a, b) => {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    })
  }

  // mergeTwoArrays(uniqueNamesArray: string[], workingHoursArray: number[]): IEmployeeDisplay[] {
  //   var newArray = [];

  //   for (let i = 0; i < uniqueNamesArray.length - 1; i++) {
  //     newArray.push({ name: uniqueNamesArray[i], workedHours: workingHoursArray[i] });
  //   }

  //   return newArray;
  // }

  // getWorkingHoursPerEmployee(uniqueEmployeeNames: string[], allData: IEmployeeApi[]): number[] {
  //   let workingHoursArray: number[] = [];

  //   uniqueEmployeeNames.forEach((uniqueName) => {
  //     let time = 0;
  //     allData.forEach((empl, index) => {
  //       if (uniqueName == empl.EmployeeName) {
  //         var parsedDateEnd = new Date(Date.parse(empl.EndTimeUtc)).getTime();
  //         var parsedDateStart = new Date(Date.parse(empl.StarTimeUtc)).getTime();
  //         time += Math.round(parsedDateEnd / MS_TO_HOURS_RATIO - parsedDateStart / MS_TO_HOURS_RATIO)
  //       } else {
  //         if (allData.length - 1 == index) {
  //           workingHoursArray.push(time)
  //         }
  //       }
  //     })
  //     time = 0;
  //   })

  //   return workingHoursArray;
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MS_TO_HOURS_RATIO } from '../constants/ms-to-hours-ration';
import { IEmployeeApi } from '../interfaces/i-employee-api';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl: string = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<IEmployeeApi[]> {
    return this.http.get<IEmployeeApi[]>(this.apiUrl);
  }

  getReducedEmployees(data: IEmployeeApi[]): IEmployeeApi[] {
    return data.reduce((previous, next) => {
      var index = previous.findIndex(x => x.EmployeeName == next.EmployeeName)
      if (index > -1) {
        let time = this.getHoursFromMilliseconds(next);
        previous[index].time += time;
      } else {
        let time = this.getHoursFromMilliseconds(next);
        next.time = time;
        previous.push(next)
      }
      return previous;
    }, [])
  }

  getHoursFromMilliseconds(obj: IEmployeeApi): number {
    let parsedDateEnd = new Date(Date.parse(obj.EndTimeUtc)).getTime();
    let parsedDateStart = new Date(Date.parse(obj.StarTimeUtc)).getTime();
    return Math.round(parsedDateEnd / MS_TO_HOURS_RATIO - parsedDateStart / MS_TO_HOURS_RATIO)
  }
}

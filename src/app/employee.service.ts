import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
      private http: HttpClient,
      private messageService: MessageService
      ) { }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    private employeesUrl = 'api/employees';

    getEmployees(): Observable<Employee[]> {
        this.messageService.add('EmployeeService: fetched employees');
        return this.http.get<Employee[]>(this.employeesUrl);
    }

    getEmployee(id): Observable<Employee> {
        return this.http.get<Employee>(this.employeesUrl);
    }

}

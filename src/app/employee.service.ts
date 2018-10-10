import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    private employeesUrl = 'api/employees';

    constructor(
      private http: HttpClient,
      private messageService: MessageService
    ) { }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }


    getEmployees(): Observable<Employee[]> {
         return this.http.get<Employee[]>(this.employeesUrl).pipe(
                 tap(employees => this.log('fetched employees')),
                 catchError(this.handleError('getEmployees', []))
            );
    }

    getEmployee(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.employeesUrl}/${id}`).pipe(
                tap(_ => this.log(`fetched employee id = ${id}`)),
                catchError(this.handleError<Employee>(`getEmployee id ${id}`))
            );
    }

    updateHero (employee: Employee): Observable<any> {
      return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
        tap(_ => this.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

}

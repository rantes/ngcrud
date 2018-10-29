import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[] = [
        {id: 1, name: 'Gioccomo Guilizzoni', job: 'Founder & CEO', age: 40, username: 'Peldi', hired: 1506865357, birthdate: 0},
        {id: 2, name: 'Marco Botton', job: 'Tuttofare', age: 38, username: 'Marcopolo', hired: 979134157, birthdate: 0},
        {id: 3, name: 'Mariah Maclachlan', job: 'Better Half', age: 41, username: 'Patata', hired: 1454364472, birthdate: 0},
        {id: 3, name: 'Valerie Liberty', job: 'Head Chef', age: 30, username: 'Val', hired: 1514930872, birthdate: 0},
    ];
    return {employees};
  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(hero => hero.id)) + 1 : 11;
  }
}

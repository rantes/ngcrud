import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatFormFieldControl, MatButton, MatIcon } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Employee} from '../employee';
import { EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[];
    sortedData;
    displayedColumns = ['name','age','username','hired', 'actions'];
    selectedEmployee: Employee;

    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private router: Router,
        private location: Location
        ) { }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    getEmployees(): void {
        this.employeeService.getEmployees().subscribe(employees => {
            this.employees = employees
            this.sortedData = new MatTableDataSource(this.employees);
            this.sortedData.sort = this.sort;
            this.sortedData.paginator = this.paginator;
        });
    }

    ngOnInit() {
        this.getEmployees();
    }

    applyFilter(filterValue: string) {
        this.sortedData.filter = filterValue.trim().toLowerCase();
    }

    deleteEmployee(employee: Employee): void {
      this.employees = this.employees.filter(e => e !== employee);
      this.employeeService.deleteEmployee(employee).subscribe(() => this.goBack());
    }

    goBack(): void {
        this.router.navigate(['/employees']);
    }

}
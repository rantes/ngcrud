import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatFormFieldControl, MatButton, MatIcon } from '@angular/material';
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

    constructor(private employeeService: EmployeeService) {
    }

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

    editEmployee(employee) {
        this.selectedEmployee = employee;
    }

}
import { Component, OnInit, Input } from '@angular/core';
import {MatFormFieldControl, MatDatepicker} from '@angular/material';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  private idEmployee: number = 0;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private employeeService: EmployeeService,
      private location: Location
    ) { }


  ngOnInit() {
    this.idEmployee = +this.route.snapshot.paramMap.get('id');
    this.idEmployee > 0 ? this.getEmployee() : (this.employee = new Employee());
  }

  save(): void {
   this.employeeService.updateEmployee(this.employee)
     .subscribe(() => this.goBack());
  }

  getEmployee(): void {
    this.employeeService.getEmployee(this.idEmployee).subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

}

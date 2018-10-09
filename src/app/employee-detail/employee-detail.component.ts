import { Component, OnInit, Input } from '@angular/core';
import {MatFormFieldControl} from '@angular/material';

import { ActivatedRoute } from '@angular/router';
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

  constructor(
      private route: ActivatedRoute,
      private employeeService: EmployeeService,
      private location: Location
    ) { }


  ngOnInit() {
    this.getEmployee();
  }

  closeDetail() {
      this.employee = null;
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee);
  }

}

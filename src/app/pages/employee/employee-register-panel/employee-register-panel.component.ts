import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';  
import { EmployeeModelData, EmployeeResponseModel } from 'src/app/models/employee/employee-model';

import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../others/confirm-dialog/confirm-dialog.component';
import { SharedService } from 'src/app/services/shared/shared.service';
 
@Component({
  selector: 'app-employees-employee-register-panel',
  templateUrl: './employee-register-panel.component.html' 
})
export class EmployeeRegisterPanelComponent implements OnInit {
  title = 'Employee';
  
  _sharedService: SharedService; 
  
 @Input() Model: EmployeeModelData = new EmployeeModelData; 
 @Input() showRegisterButton: boolean = false; 
 
 @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();
 
 constructor(private formBuilder: FormBuilder, sharedService: SharedService) {
    this._sharedService = sharedService; 
}

 
  ngOnInit(): void { 
 
   
  }
  
  onSubmitClick(form: NgForm) {
    this.submitClicked.emit(form);
  }

  }
 
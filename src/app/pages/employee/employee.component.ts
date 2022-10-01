import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms'; 
import { SharedService } from '../../services/shared/shared.service';
import { EmployeeModelData } from 'src/app/models/employee/employee-model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../others/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import * as FileSaver from 'file-saver';
import { EmployeeService } from 'src/app/services/employee/employee.service';
@Component({
  selector: 'app-employees-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  groupTitle = 'Employee';
  title = 'Employee';
 
  _employeeService: EmployeeService; 
  _sharedService: SharedService; 
  public _dialog: MatDialog
  
  SaveMode = 'New'; 
  pnlBackForms = false;  
  pnlFirstPage = true; 
  pnlCreateEditForm = false;    
  showRegisterButton = true; 
 
  displayedColumns: string[] = ['name', 'sureName', 'actions'];
  NewEditRowModel: EmployeeModelData = new EmployeeModelData;  
  dataList:MatTableDataSource<EmployeeModelData>=new MatTableDataSource<EmployeeModelData>;

  constructor(private formBuilder: FormBuilder, sharedService: SharedService, employeeService: EmployeeService, dialog: MatDialog) {
    this._employeeService = employeeService; 
    this._sharedService = sharedService; 
    this._dialog = dialog; 
  }
 
 
  ngOnInit(): void { 
    debugger
   this.getGridList();
   
  }
 
  getGridList() {  
  
      this._employeeService.GetAllData().subscribe(
        (data: EmployeeModelData[]) => { 
          this.dataList = new MatTableDataSource(data) 
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.toastError('Error' + ' | ' + responseError.error, `Error Code ${responseError.error.error.error_code}`);      
        });
  }

  onOpenCreateEditFormPanel() {
    this.pnlFirstPage = false;
    this.pnlCreateEditForm = true;
    this.pnlBackForms = true; 
    this.showRegisterButton = true;
    this.NewEditRowModel = new EmployeeModelData;
  }

  onBackAll() {
    this.pnlFirstPage = true;
    this.pnlBackForms = false;
    this.pnlCreateEditForm = false; 
  }
 
  onEdit(SelectedRow: EmployeeModelData){ 
    debugger
    this.SaveMode = 'Edit';
    this.onOpenCreateEditFormPanel();
    this.showRegisterButton = true;
    this.NewEditRowModel=SelectedRow;
  }
 
  onDetail(SelectedRow: EmployeeModelData){ 
    debugger
    this.SaveMode = 'Detail';
    this.onOpenCreateEditFormPanel();
    this.showRegisterButton = false;
    this.NewEditRowModel=SelectedRow;
  }
 
  onDelete(SelectedRow: EmployeeModelData){
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '15vw',
      data: { message: "Are you sure ?" }
    });
    dialogRef.afterClosed().subscribe(result => { 
      if (result == undefined)
        return;

        this._employeeService.Delete(SelectedRow.id).subscribe(
          (data: EmployeeModelData) => {
     
            this._sharedService.toastSuccess('Done');
            this.getGridList();
          },
          (responseError: HttpErrorResponse) => { 
            this._sharedService.toastError('Error' + ' | ' + responseError.error, `Error Code ${responseError.error.error.error_code}`);
          });
    });  
  }
   
  onCreateEditElements(SelectedRow: EmployeeModelData){
    this.pnlFirstPage = false;
    this.pnlBackForms = true;
    this.pnlCreateEditForm = false; 
    this.NewEditRowModel=SelectedRow;  
  }
  
 
  onSubmit(form: NgForm) {  
      
    if (this.SaveMode == 'New') { 
 
     this._employeeService.Insert(this.NewEditRowModel).subscribe(
      (data: EmployeeModelData) => {

        this.onBackAll();
        this.SaveMode = 'New';
        this.NewEditRowModel = new EmployeeModelData;
    
        this._sharedService.toastSuccess('Done');
        this.getGridList();
      },
      (responseError: HttpErrorResponse) => { 
        this._sharedService.processModelStateErrors(form, responseError); 
      });
      // this.FormList.push(this.NewEditRowModel); 
    } else if (this.SaveMode == 'Edit') { 
      this._employeeService.Update(this.NewEditRowModel).subscribe(
        (data: EmployeeModelData) => {
  
          this.onBackAll();
          this.SaveMode = 'New';
          this.NewEditRowModel = new EmployeeModelData;
      
          this._sharedService.toastSuccess('Done');
          this.getGridList();
        },
        (responseError: HttpErrorResponse) => { 
          this._sharedService.processModelStateErrors(form, responseError); 
        });
    } 
  }
  
  applyFilter(event: Event) {
    debugger
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataList.filter = filterValue
  } 
}
 
 

 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 

@Injectable({
  providedIn: 'root'
})
export class SharedService {

      
  constructor(private toastr : ToastrService ) { 
   }
 
 
  toastError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  toastInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  toastSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title);
  }

  toastWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title);
  }



 //--------------- Errors
  errors: string[] = [];

  processModelStateErrors(form: NgForm, responseError: HttpErrorResponse) {
    this.errors=[];

    if (responseError.status === 400) {
      const modelStateErrors = responseError.error.errors;
      for (let i=0; i < modelStateErrors.length;  i++) {
         const fieldName =  modelStateErrors[0].propertyName;
          const modelStateError = modelStateErrors[0].errorMessage;
          const control = form.controls[fieldName] || form.controls[this.lowerCaseFirstLetter(fieldName)] || form.controls[fieldName.split('.')[1]];
          if (control) {
            // integrate into Angular's validation
            control.setErrors({
              modelStateError: { error: modelStateError }
            });
          } else {
            // for cross field validations -> show the validation error at the top of the screen
            this.toastError('Error' + ' | ' + modelStateErrors.error.error_description, `Error Code ${modelStateErrors.error.error_code}`);
          }
      }
    } else {
      this.toastError('Error');
    }
  }

  lowerCaseFirstLetter(data: string): string {
    return data.charAt(0).toLowerCase() + data.slice(1);
  }
}

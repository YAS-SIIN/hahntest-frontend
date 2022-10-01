import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiPath } from 'src/app/apiPath';
import { EmployeeModelData } from 'src/app/models/employee/employee-model';
import { environment } from '../../../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _http: HttpClient;

  private _controllerPath: string = `${environment.baseUrl}${ApiPath.Employee}`;

  constructor(http: HttpClient) {
    this._http = http;
  }

  GetAllData() {
     
    let url = `${this._controllerPath}`;

    return this._http.get<EmployeeModelData[]>(url, {
     
    });
  }

  Insert(data:EmployeeModelData) {
     
    let url = `${this._controllerPath}`;

    return this._http.post<EmployeeModelData>(url, data, { 
    });
  }

  
  Update(data:EmployeeModelData) {
     
    let url = `${this._controllerPath}`;

    return this._http.put<EmployeeModelData>(url, data, {
     
    });
  }

  Delete(Id: number) {
     
    let url = `${this._controllerPath}?Id=${Id}`;

    return this._http.delete<EmployeeModelData>(url,  {
     
    });
  }
}

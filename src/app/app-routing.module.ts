import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component';   
import { EmployeeComponent } from './pages/employee/employee.component';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [ 
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {
    path: '', component: MainComponent, 
    children: [ 
      { path: 'employee', component: EmployeeComponent, pathMatch: 'full' }, 
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

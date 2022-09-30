import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component';   
import { EmployeeComponent } from './pages/employee/employee.component';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [ 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: EmployeeComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },   
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

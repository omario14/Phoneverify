import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {CheckingComponent} from './checking/checking.component';



const routes: Routes = [{ path: 'check', component: CheckingComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }

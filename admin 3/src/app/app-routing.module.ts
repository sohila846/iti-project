import { AddserviceComponent } from './addservice/addservice.component';
import { LoginGuard } from './login.guard';
import { ProvideprofileComponent } from './provideprofile/provideprofile.component';
import { ChartsComponent } from './charts/charts.component';
import { ManageprovidersComponent } from './manageproviders/manageproviders.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { LogoutGuard } from './logout.guard';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[LogoutGuard]
  },
  {
  path: 'login',
  component: LoginComponent,
  canActivate:[LogoutGuard]
  
},
{
  path: 'register',
  component: RegisterComponent,
 
},
{
  path: 'addservice',
  component: AddserviceComponent,
 
},
{
  path: 'login-register',
  component: RegisterComponent,
 
},
{
  path: 'register-login',
  component: LoginComponent,
 
},
{
  path: 'admin-dashboard',
  component: AdminDasboardComponent,
  canActivate:[LoginGuard]
 
},
{
  path: 'admin-dashboard/manageuser',
  component: ManageusersComponent,
 
},
{
  path: 'admin-dashboard/orders',
  component:OrdersComponent,
 
},
{
  path: 'admin-dashboard/chart',
  component: ChartsComponent,
 
},

{
  path: 'admin-dashboard/managecustomers',
  component:ManageprovidersComponent,
 
},

{
  path: 'admin-dashboard/manageproduct',
  component: ManageproductsComponent,
 
},
{
  path: 'admin-dashboard/providerprofile',
  component: ProvideprofileComponent,
 
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }

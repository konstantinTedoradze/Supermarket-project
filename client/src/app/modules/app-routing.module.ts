import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { HomeComponent } from '../components/home/home.component';
import { OrderComponent } from '../components/order/order.component';
import { RegisterComponent } from '../components/register/register.component';
import { StartComponent } from '../components/start/start.component';
import { AdminGuard } from '../guards/Admin.guard';
import { CustomerGuard } from '../guards/CustomerAndAdmin.guard';

const routes: Routes = [

  { path: "login", component: StartComponent },
  {path: "register", component: RegisterComponent},
  // canActivate: [CustomerGuard],
  {path: "home",canActivate: [CustomerGuard],component: HomeComponent, children: [
    {path: "Milk & Eggs", component: HomeComponent},
    {path: "Vegetables & fruits", component: HomeComponent},
    {path: "Meat & Fish", component: HomeComponent},
    {path: "Wine & Drinks", component: HomeComponent}
  ]},
  // canActivate: [CustomerGuard],
  { path: "admin",canActivate: [AdminGuard], component: AdminComponent},
  {path: "search/:searchTerm", component: HomeComponent},
  {path: "order",canActivate: [CustomerGuard], component: OrderComponent},
  {path: "", redirectTo: "login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

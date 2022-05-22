import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, canActivate: [AuthGuard], children: [
      {
        path: '', component: OrdersComponent
      },
      {
        path: 'orders', component: OrdersComponent
      },
    ],
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

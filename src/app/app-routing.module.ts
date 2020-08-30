import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { ItemsComponent } from './pages/items/items.component';
import { ItemComponent } from './pages/item/item.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'category/:id', component: CategoriesComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'items', component: ItemsComponent
  },
  {
    path: 'item/:id', component: ItemComponent,
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'confirm/:id', component: ConfirmComponent },
  // { path: 'contest/:id', component: ContestComponent, canActivate: [UserGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [UserGuard] },
  { path: 'order/:id', component: OrderComponent, canActivate: [UserGuard] },
  // { path: 'home/:status', component: HomeComponent, canActivate: [UserGuard] },
  // { path: 'setting', component: SettingComponent, canActivate: [UserGuard] },
  // { path: 'buy', component: PurchaseComponent, canActivate: [UserGuard] },
  // { path: 'sell', component: SellComponent, canActivate: [UserGuard] },
  // { path: 'history', component: HistoryComponent, canActivate: [UserGuard] },
  // { path: 'change', component: ChangePasswordComponent, canActivate: [UserGuard] },
  // {
  //   path: 'conflict', component: ConflictComponent, canActivate: [UserGuard],
  //   data: {
  //     permissions: ['admin']
  //   }
  // },
  // {
  //   path: 'timeout', component: TimeoutComponent, canActivate: [UserGuard],
  //   data: {
  //     permissions: ['admin']
  //   }
  // },
  // {
  //   path: 'cancel', component: CancelComponent, canActivate: [UserGuard],
  //   data: {
  //     permissions: ['admin']
  //   }
  // },
  // {
  //   path: 'sell-req', component: SellRequestsComponent, canActivate: [UserGuard],
  //   data: {
  //     permissions: ['admin']
  //   }
  // },
  // {
  //   path: 'add-req', component: AddRequestsComponent, canActivate: [UserGuard],
  //   data: {
  //     permissions: ['admin']
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
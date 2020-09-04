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
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { ViewCategoriesComponent } from './pages/view-categories/view-categories.component';
import { EditSubCategoryComponent } from './pages/edit-sub-category/edit-sub-category.component';
import { ViewSubCategoriesComponent } from './pages/view-sub-categories/view-sub-categories.component';
import { AddSubCategoryComponent } from './pages/add-sub-category/add-sub-category.component';
import { ViewItemsComponent } from './pages/view-items/view-items.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { ViewOrdersComponent } from './pages/view-orders/view-orders.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';

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
  {
    path: 'add-category', component: AddCategoryComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'view-categories', component: ViewCategoriesComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'add-sub-category', component: AddSubCategoryComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'view-sub-categories', component: ViewSubCategoriesComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'edit-sub-category/:id', component: EditSubCategoryComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'view-items', component: ViewItemsComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'view-orders', component: ViewOrdersComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'add-item', component: AddItemComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'edit-item/:id', component: EditItemComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
  {
    path: 'edit-order/:id', component: EditOrderComponent, canActivate: [UserGuard],
    data: {
      permissions: ['admin']
    }
  },
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

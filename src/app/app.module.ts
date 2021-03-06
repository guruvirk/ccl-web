import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatDialogModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSnackBarModule } from "@angular/material";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ItemsComponent } from './pages/items/items.component';
import { ItemComponent } from './pages/item/item.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OptionDialogComponent } from './components/option-dialog/option-dialog.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SettingComponent } from './pages/setting/setting.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrderComponent } from './pages/order/order.component';
import { ProcessingIndicatorComponent } from './components/processing-indicator/processing-indicator.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TncDialogComponent } from './components/tnc-dialog/tnc-dialog.component';
import { EasyZoomModule } from 'angular-easy-zoom';
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
import { ReviewOrderComponent } from './pages/review-order/review-order.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { BannersComponent } from './pages/banners/banners.component';
import { CheckoutConfirmComponent } from './components/checkout-confirm/checkout-confirm.component';
import { SnackBarComponent } from './services/ux.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoriesComponent,
    ItemsComponent,
    ItemComponent,
    OptionDialogComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    PaymentComponent,
    OrderComponent,
    ProcessingIndicatorComponent,
    ConfirmComponent,
    ResetComponent,
    SettingComponent,
    ChangePasswordComponent,
    PaginatorComponent,
    TncDialogComponent,
    CheckoutConfirmComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ViewCategoriesComponent,
    EditSubCategoryComponent,
    ViewSubCategoriesComponent,
    AddSubCategoryComponent,
    ViewItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ViewOrdersComponent,
    EditOrderComponent,
    ReviewOrderComponent,
    ImageViewComponent,
    BannersComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    EasyZoomModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OptionDialogComponent, TncDialogComponent, ImageViewComponent, CheckoutConfirmComponent, SnackBarComponent],
  exports: [ProcessingIndicatorComponent]
})
export class AppModule { }

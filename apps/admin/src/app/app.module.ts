import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { JwtInterceptor, UsersModule } from '@eshop/users';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService } from '@eshop/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CarouselModule } from 'primeng/carousel';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import {SidebarModule} from 'primeng/sidebar';
import {AutoCompleteModule} from 'primeng/autocomplete';


import {FileUploadModule} from 'primeng/fileupload';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';
import { MaterialsListComponent } from './pages/materials/materials-list/materials-list.component';
import { MaterialsFormComponent } from './pages/materials/materials-form/materials-form.component';
import { BrandsFormComponent } from './pages/brands/brands-form/brands-form.component';
import { BrandsListComponent } from './pages/brands/brands-list/brands-list.component';
import { SuppliersListComponent } from './pages/suppliers/suppliers-list/suppliers-list.component';
import { SuppliersFormComponent } from './pages/suppliers/suppliers-form/suppliers-form.component';


const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
  CarouselModule,
  PaginatorModule,
  FileUploadModule,
  AutoCompleteModule,
  SidebarModule
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ShellComponent,
    DashboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
    MaterialsListComponent,
    MaterialsFormComponent,
    BrandsFormComponent,
    BrandsListComponent,
    SuppliersListComponent,
    SuppliersFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    ...UX_MODULE,
    NgxStripeModule.forRoot('pk_test_51L1vfBKyFUqEluimU5FSFgnGznbByFHlY1PCzFER2gMDD3KeMM56d5HsymWZ1VB0aSMYyJQ7HXeM5aX0mXDLnp5f00YiyRCjAA')

  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

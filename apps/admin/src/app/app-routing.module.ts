import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@eshop/users';
import { BrandsFormComponent } from './pages/brands/brands-form/brands-form.component';
import { BrandsListComponent } from './pages/brands/brands-list/brands-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialsFormComponent } from './pages/materials/materials-form/materials-form.component';
import { MaterialsListComponent } from './pages/materials/materials-list/materials-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { SuppliersFormComponent } from './pages/suppliers/suppliers-form/suppliers-form.component';
import { SuppliersListComponent } from './pages/suppliers/suppliers-list/suppliers-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent
      },
      {
        path: 'materials',
        component: MaterialsListComponent
      },
      {
        path: 'materials/form',
        component: MaterialsFormComponent
      },
      {
        path: 'brands',
        component: BrandsListComponent
      },
      {
        path: 'brands/form',
        component: BrandsFormComponent
      },
      {
        path: 'suppliers',
        component: SuppliersListComponent
      },
      {
        path: 'suppliers/form',
        component: SuppliersFormComponent
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}

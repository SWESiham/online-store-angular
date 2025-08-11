import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import { AddProductComponent } from './component/add-product/add-product.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./component/home/home.component').then(m => m.HomeComponent) },
    { path: 'home', loadComponent: () => import('./component/home/home.component').then(m => m.HomeComponent) },
    {path: 'product', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'admin-panel', component: AdminPanelComponent },
    { path: '**', component: NotFoundComponent }
];
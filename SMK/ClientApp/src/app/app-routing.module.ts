import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ProductComponent} from './components/product/product.component';
import {ProductsComponent} from './components/products/products.component';
import {AuthComponent} from './components/auth/auth.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {AuthenticationGuard} from './components/auth/authentication.guard';
import {ContactsComponent} from './components/contacts/contacts.component';
import {MainComponent} from './components/main/main.component';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'products/add', component: AddProductComponent, canActivate: [AuthenticationGuard]},
  {path: 'products/:id', component: ProductComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductComponent} from './components/product/product.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ProductCardComponent} from './components/products/product-card/product-card.component';
import {AuthComponent} from './components/auth/auth.component';
import {BoardComponent} from './components/board/board.component';
import {ImageComponent} from './components/product/image/image.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {AuthenticationInterceptor} from './components/auth/authentication.interceptor';
import {UserService} from './services/user.service';
import {ContactsComponent} from './components/contacts/contacts.component';
import {YaMapComponent} from './components/contacts/ya-map/ya-map.component';
import {MainComponent} from './components/main/main.component';
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {HeaderComponent} from "./components/header/header.component";
import {ContentComponent} from "./components/content/content.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    HeaderComponent,
    ContentComponent,
    NavigationComponent,
    ProductsComponent,
    ProductComponent,
    NotFoundComponent,
    ProductCardComponent,
    AuthComponent,
    BoardComponent,
    ImageComponent,
    AddProductComponent,
    ContactsComponent,
    YaMapComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

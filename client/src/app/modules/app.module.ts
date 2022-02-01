import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from '../components/product/product.component';
import { ProductsSubTextPipe } from '../pipes/ProductsSubTextPipe';
import { RegisterComponent } from '../components/register/register.component';
import { DescriptionComponent } from '../components/description/description.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { StartComponent } from '../components/start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ItemComponent } from '../components/item/item.component';
import { OrderComponent } from '../components/order/order.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminComponent } from '../components/admin/admin.component';
import { UsersService } from '../services/users-service.service';
import { ProductsService } from '../services/products-service.service';
import { ShoppingCartsService } from '../services/shopping-carts.service';
import { ShareDataService } from '../services/share-data.service';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import {HighlightSearch} from '../pipes/HighlightTextPipe';
import { OrderDialogComponent } from '../components/order-dialog/order-dialog.component';
import { ExpansionPanelComponent } from '../components/expansion-panel/expansion-panel.component'; 
// import { creditCardValidator } from '../validators/creditCard.Validator';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    ProductsSubTextPipe,
    HighlightSearch,
    RegisterComponent,
    DescriptionComponent,
    NotificationComponent,
    StartComponent,
    DialogComponent,
    ItemComponent,
    OrderComponent,
    AdminComponent,
    OrderDialogComponent,
    ExpansionPanelComponent,
    // creditCardValidator
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [UsersService
    , ProductsService, ShoppingCartsService, ShareDataService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

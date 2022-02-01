import { Component, Inject, Input, OnInit } from '@angular/core';
import { CartItemDetails } from 'src/app/models/CartItemDetails';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';
import { UsersService } from 'src/app/services/users-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { observable } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public shoppingCarts: ShoppingCartsService, public dialog: MatDialog,public shareService: ShareDataService,
    public usersService: UsersService, private fb: FormBuilder, public ordersService: OrdersService) { }

  public currentCity: string = '';
  public currentStreet: string = '';
  public url: string = "http://localhost:3001/uploads/";
  public freeText: string = '';
  public isShownItem: boolean = false;
  public searchTerm: string | undefined;
  public card!: FormControl;
  public minDate = new Date();
  public maxDate = new Date(2022, 3, 10);

  public deliveryDate?: Date;
  public isError: boolean = false;
  public isModal: boolean = false;
  public productName: string = '';

  updateSearch(e: any) {
    this.searchTerm = e.target.value
    console.log(this.searchTerm);
  }

  ngOnInit(): void {

    if(sessionStorage.token) {
      this.shareService.userName = this.usersService.getLoginToken("userName");
      this.shareService.isShownName = true;
    } 

    this.card = new FormControl("", [Validators.required,
    Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]);

    const observable = this.shoppingCarts.getAllCartsItems();


    observable.subscribe(Cartitems => {
      this.shareService.Cartitems = Cartitems;
      console.log(Cartitems, "Cartitems");
      this.shareService.sum = 0;
      for (let i = 0; i < this.shareService.Cartitems.length; i++) {
        this.shareService.sum += this.shareService.Cartitems[i].price * this.shareService.Cartitems[i].quantity;
      }
    }, serverErrorResponse => {
      console.log("Error 10!" + serverErrorResponse);
    })
  }


  public onDoubleClickCity(): void {

    const observable = this.usersService.getUserCity();

    observable.subscribe(Cities => {
      this.currentCity = Cities[0].city;
      console.log(Cities[0].city, "City");
    }, serverErrorResponse => {
      console.log("Error 11!" + serverErrorResponse);
    })
  }

  public onDoubleClickStreet(): void {
    console.log('asdfsfdasdf');
    const observable = this.usersService.getUserStreet();

    observable.subscribe(Streets => {
      this.currentStreet = Streets[0].street;
      console.log(Streets, "City");
    }, serverErrorResponse => {
      console.log("Error 12!" + serverErrorResponse);
    })
  }

  public showItem(item: any) {
    // Debugging using printing the object value in the browser's console
    console.log(item, 'jobeeeeeeee');
    this.isShownItem = false;
  }

  public showItems() {
    this.isShownItem = true;
  }


  public onOrder() {
    console.log('order');
    console.log(this.card, 'vcarddddd')

    if (this.currentCity !== '' && this.currentStreet !== '' &&
      this.deliveryDate !== null && this.card.value !== "") {
      console.log('yessssssssss');
      this.isError = false;
      this.isModal = true;

      let cardlastDigit = this.card.value % 10000;
      console.log(cardlastDigit, 'vcarddddd lastt deggitttttttt');
      console.log(this.convert(this.deliveryDate), 'delivery dateeeeeeee');
      let orderDetails =  {
          sum: this.shareService.sum,
          deliveryDate: this.convert(this.deliveryDate),
          lastDigit: cardlastDigit,
          deliveryCity: this.currentCity,
          deliveryStreet: this.currentStreet
      };
      this.addOrder(orderDetails);

      let dialogRef = this.dialog.open(OrderDialogComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(() => { dialogRef.close() }, 3000);
        console.log(result, 'of dialog');
      });
      
    } else {
      this.isError = true;
    }
  }

  public addOrder(orderDetails: OrderDetails){
    const observable = this.ordersService.addOrderData(orderDetails);

    observable.subscribe(successfullyresponse => {
      console.log(successfullyresponse, "City");
    }, serverErrorResponse => {
      console.log("Error 13!" + serverErrorResponse);
    })
  }

  public OnDateChange(event: any): void {
    this.deliveryDate = event;
  }

  public convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


}

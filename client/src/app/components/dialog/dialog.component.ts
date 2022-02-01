import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartItemDetails } from 'src/app/models/CartItemDetails';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
      public shoppingCartsService: ShoppingCartsService, public shareDataService: ShareDataService) { }

  public url: string = "http://localhost:3001/uploads/";
  public quantity: number = 1;
  public id: number = this.data.id;
  onIncrement() : void {
    if(this.quantity >= 1) {
      this.quantity++;
    }
  }

  onDecrement() : void {
    if(this.quantity > 1) {
      this.quantity--;
    }  
  }

  public addItem = () : void => {
  
    let itemDetails: CartItemDetails = new CartItemDetails(this.id,this.quantity);
    console.log("product id,quantity",itemDetails);
    const observable = this.shoppingCartsService.getCartItem(itemDetails);
     
    observable.subscribe(SuccessfullServerRequestData => {
      console.log(SuccessfullServerRequestData,'sussssssssssssssssssssss');
        this.shareDataService.chosenItemsInshoppingCart();
    }, serverErrorResponse => {
      console.log("Error 1!" + serverErrorResponse);
    });
  }

  ngOnInit(): void {
  }

}

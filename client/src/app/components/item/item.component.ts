import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails } from 'src/app/models/CartItemDetails';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public shoppingCarts: ShoppingCartsService, 
        public router: Router, public shareDataService: ShareDataService) { }

  public url: string = "http://localhost:3001/uploads/";
  public isShownButtonDelete: boolean = false;

  @Input() item: any = new CartItemDetails();
  @Input() searchTerm: any

  public onDeleteItem() : void {
    console.log(this.item.id,"id Delete");
    let cartItemId = this.item.id;
    const observable = this.shoppingCarts.deleteCurrentItem(cartItemId);

    observable.subscribe(SuccessfullServerResponse => {
      console.log(SuccessfullServerResponse);
      this.shareDataService.chosenItemsInshoppingCart();
    }, serverErrorResponse => {
      console.log("Error 7!" + serverErrorResponse);
    })
  }

  ngOnInit(): void {
    console.log(this.router);
    if(this.router.url.includes('/home')) {
        this.isShownButtonDelete = true;
    }
  }

}

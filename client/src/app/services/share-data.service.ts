import { Injectable } from '@angular/core';
import { ProductsDetails } from '../models/ProductsDetails';
import { OrdersService } from './orders.service';
import { ProductsService } from './products-service.service';
import { ShoppingCartsService } from './shopping-carts.service';
import { UsersService } from './users-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  public isShownDiv: boolean = false;
  public isShownName: boolean = false;
  public userName: string = ''; 
  public products: ProductsDetails[] = [];
  public Cartitems: any = [];
  public orders: number = 0;
  public sum: number = 0;
  public isAdminProduct: boolean = false;
  public inItemsConfigDivShown: boolean = false;
  public isShownClickedItem: boolean = false;
  public productInfo: any;
  public refreshAdminComponent: boolean = false;
  public currentProducts: ProductsDetails[] = [];
  public isShownNotification: boolean = false;
  public isPurchaseLastDate: boolean = false;
  public purchaseLastDate: string = 'date';
  public isLastCartDate: boolean = false;
  public lastCartDate: string = 'date';

  constructor(public productsService: ProductsService,public orderService: OrdersService,
     public shoppingCartsService: ShoppingCartsService, public usersService: UsersService) { 
    console.log(this.isShownName,"shareDataServiceName");
  }

  public lastPurchase(): void {
    const observable = this.usersService.getLastPurchaseDate();
  
      observable.subscribe(lastPurchase => {
        if(lastPurchase == null){
          this.isPurchaseLastDate = false;
        } else {
          this.isPurchaseLastDate = true;
          let date = lastPurchase;
          this.purchaseLastDate = date.split('T')[0];
        }
        console.log(lastPurchase,"lastDateeeeeee");
      }, serverErrorResponse => {
        alert("Error 82!" + serverErrorResponse);
      })
  }

  public openCartDate(): void {
    const observable = this.shoppingCartsService.getlastCartDate();
  
      observable.subscribe(lastCartDate => {
        if(lastCartDate == null){
          this.isLastCartDate = false;
        } else {
          this.isLastCartDate = true;
          let date = lastCartDate;
          this.lastCartDate = date.split('T')[0];
        }
        console.log(lastCartDate,"lastCartDate");
      }, serverErrorResponse => {
        alert("Error 89!" + serverErrorResponse);
      })
  }

  public allProducts() : void {
    const observable2 = this.productsService.getAllProducts();
  
    observable2.subscribe(products => {
      this.products = products;
      console.log(products,'lengthhhh');
     
    }, serverErrorResponse => {
      alert("Error 9!" + serverErrorResponse);
    })
  } 

  public getCartItems = (): void => {
    const observable1 = this.productsService.getCurrentProducts('Milk & Eggs');
       observable1.subscribe(currentProducts => {
         this.currentProducts = currentProducts;
       }, serverErrorResponse => {
         alert("Error 5!" + serverErrorResponse);
     });
   }

  public allOrders(): void {
    const observable = this.orderService.getAllOrders();
  
    observable.subscribe(orders => {
      this.orders = orders;
      console.log(orders,'lengthhhh');
    }, serverErrorResponse => {
      alert("Error 25!" + serverErrorResponse);
    })
  }
  
  public chosenItemsInshoppingCart(): void{
    const observable3 = this.shoppingCartsService.getAllCartsItems();

        observable3.subscribe(Cartitems => {
          this.shoppingCartsService.Cartitems = Cartitems;
          console.log(Cartitems,"Cartitems");
          this.sum = 0;
          for(let i = 0; i < this.shoppingCartsService.Cartitems.length; i++){
            this.sum += this.shoppingCartsService.Cartitems[i].price * this.shoppingCartsService.Cartitems[i].quantity;
          }
          
        }, serverErrorResponse => {
          alert("Error 4!" + serverErrorResponse);
        })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDetails } from 'src/app/models/CagegoryDetails';
import { ProductsDetails } from 'src/app/models/ProductsDetails';
import { ProductsService } from 'src/app/services/products-service.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public productsService: ProductsService, public shoppingCarts: ShoppingCartsService,
              private router: Router, public shareService: ShareDataService, public usersService: UsersService) {}
  
  public categories: any[] = [];
  public currentProducts: ProductsDetails[] = [];
  public subText: any;
  public showFiller = true;
  public showSearchedProduct: boolean = false;
  public fillteredCurrentProducts: ProductsDetails[] = [];

  ngOnInit(): void {
    if(sessionStorage.token) {
      this.shareService.userName = this.usersService.getLoginToken("userName");
      this.shareService.isShownName = true;
    } 
  
    this.shareService.chosenItemsInshoppingCart();
    this.subText = "";
    console.log(this.showSearchedProduct,'88855558855555');
    
    const observable = this.productsService.getAllCategories();

    observable.subscribe(categories => {
      this.categories = categories;
      this.categories[0].isClicked = true;
    }, serverErrorResponse => {
      console.log("Error 2!" + serverErrorResponse);
    })


    const observable1 = this.productsService.getCurrentProducts('Milk & Eggs');
      
    observable1.subscribe(currentProducts => {
      this.currentProducts = currentProducts;
    }, serverErrorResponse => {
        console.log("Error 3!" + serverErrorResponse);
    });
  

    // const observable3 = this.shoppingCarts.getAllCartsItems();

    // observable3.subscribe(Cartitems => {
    //   this.shoppingCarts.Cartitems = Cartitems;
    //   console.log(Cartitems,"Cartitems");
    //   for(let i = 0; i < this.shoppingCarts.Cartitems.length; i++){
    //     this.sum += this.shoppingCarts.Cartitems[i].price * this.shoppingCarts.Cartitems[i].quantity;
    //  }
    // }, serverErrorResponse => {
    //   alert("Error 4!" + serverErrorResponse);
    // })
    

  }

  

  public getCartItems = (): void => {
   const observable1 = this.productsService.getCurrentProducts('Milk & Eggs');
      observable1.subscribe(currentProducts => {
        this.currentProducts = currentProducts;
      }, serverErrorResponse => {
        console.log("Error 5!" + serverErrorResponse);
    });
  }

  public onSearchProducts(event: any):void {
    event.preventDefault();
    console.log(this.subText);
    console.log(this.shareService.products);
    this.showSearchedProduct = true;

    const observable = this.productsService.getProductsFillterdByName(this.subText);

    observable.subscribe(currentProducts => {
      console.log(currentProducts);
      this.fillteredCurrentProducts = currentProducts;
    }, serverErrorResponse => {
      console.log("Error !" + serverErrorResponse);
  });
    
  }

  public getCurrentCategoryProducts(categoryName: any,categ: any): void {
    console.log(categoryName);
    for (let currentCategory of this.categories) {
      currentCategory.isClicked = false;
    }
  
    categ.isClicked = true;
    const observable = this.productsService.getCurrentProducts(categoryName);

    observable.subscribe(currentProducts => {
      this.showSearchedProduct = false;
      this.currentProducts = currentProducts;
      const strParams = decodeURIComponent(categoryName);
      console.log(strParams,"strrrrparamms");
      this.router.navigate([`/home/${strParams}`]);

    }, serverErrorResponse => {
      console.log("Error 6!" + serverErrorResponse);
  });

  }

  public onOrderClicked(): void {
    console.log('989898787789798789789798');
    this.router.navigate(["/order"]);
  }


}






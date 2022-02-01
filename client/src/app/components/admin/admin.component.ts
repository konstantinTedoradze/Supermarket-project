import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDetails } from 'src/app/models/CagegoryDetails';
import { ProductsDetails } from 'src/app/models/ProductsDetails';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products-service.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public findName: any;
  public showSearchedProduct: boolean = false;
  public fillteredCurrentProducts: ProductsDetails[] = [];
  // public currentProducts: ProductsDetails[] = [];
  public categories: CategoryDetails[] = [];

  public adminAddItemForm!: FormGroup;
  public name!: FormControl;
  public price!: FormControl;
  public picture!: FormControl;
  public category!: FormControl;
  public categoryNames: string[] = ["Milk & Eggs","Vegetables & fruits","Meat & Fish","Wine & Drinks"];

  public selectedFile: any = null;
  public errorMessage: string = '';
  public isShownErrorMessage: boolean = false;
  public refresh: boolean = false;
 
  constructor(private http: HttpClient,public productsService: ProductsService,public usersService: UsersService,
    public shoppingCarts: ShoppingCartsService,public shareService: ShareDataService,
    private router: Router, public adminService: AdminService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

    ngOnInit(): void {
      if(sessionStorage.token) {
        this.shareService.userName = this.usersService.getLoginToken("userName");
        this.shareService.isShownName = true;
      } 

      console.log(this.shareService.refreshAdminComponent,'checkitttt');
      if(this.shareService.refreshAdminComponent == true) {
        this.shareService.getCartItems();
      }
    
      // this.shareService.chosenItemsInshoppingCart();
      this.findName = "";
      console.log(this.showSearchedProduct,'88855558855555');
      
      const observable = this.productsService.getAllCategories();
  
      observable.subscribe(categories => {
        this.categories = categories;
      }, serverErrorResponse => {
        console.log("Error 2!" + serverErrorResponse);
      })
  
      
      // this.getCartItems();
      this.shareService.getCartItems();

      
      this.name = new FormControl("", [Validators.required,
          Validators.minLength(5),Validators.maxLength(9)]);
      this.price = new FormControl("", [Validators.required]);
      this.picture = new FormControl("", [Validators.required]);
      this.category = new FormControl("", [Validators.required]);
      // Initializing the from group
      this.adminAddItemForm = new FormGroup({
          name : this.name,
          price: this.price,
          picture: this.picture,
          category: this.category
      });

      if(this.refresh){
        this.getCurrentCategoryProducts;
      }
    }
  

    // public getCartItems = (): void => {
    //  const observable1 = this.productsService.getCurrentProducts('Milk & Eggs');
    //     observable1.subscribe(currentProducts => {
    //       this.currentProducts = currentProducts;
    //     }, serverErrorResponse => {
    //       alert("Error 5!" + serverErrorResponse);
    //   });
    // }
  
    public onSearchProducts(event: any):void {
      event.preventDefault();
      this.showSearchedProduct = true;
      const observable = this.productsService.getProductsFillterdByName(this.findName);
      
      observable.subscribe(currentProducts => {
        this.fillteredCurrentProducts = currentProducts;
      }, serverErrorResponse => {
        console.log("Error 77!" + serverErrorResponse);
    });
      
    }
  
    public getCurrentCategoryProducts(categoryName: any): void {
      console.log(categoryName);
      const observable = this.productsService.getCurrentProducts(categoryName);
  
      observable.subscribe(currentProducts => {
        this.showSearchedProduct = false;
        this.shareService.currentProducts = currentProducts;
        const strParams = decodeURIComponent(categoryName);
        console.log(strParams,"strrrrparamms");
      }, serverErrorResponse => {
        console.log("Error 6!" + serverErrorResponse);
    });
  
    }
  
    public onShowConfigItems(): void {
      console.log('kote');
      this.shareService.isShownClickedItem = false;
      this.shareService.inItemsConfigDivShown = !this.shareService.inItemsConfigDivShown;
      
    }

    public onFileSelected(event: any) {
      console.log(event);
      this.selectedFile = <File>event.target.files[0];
    }

    public onUploadImage() {
      const fd = new FormData();
      if(this.selectedFile.name != null && this.selectedFile.name != ''){
          fd.append('file',this.selectedFile, this.selectedFile.name);
        this.http.post('http://localhost:3001/uploads',fd, {
          reportProgress: true,
          observe: 'events'
        }).subscribe((event: HttpEvent<any>) => {
          if(event.type === HttpEventType.UploadProgress && event.total !== undefined) {
            console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100)  + '%');
          } else if(event.type === HttpEventType.Response){
            console.log(event);
          }
          console.log(event);
        });
      } else {
        console.log('error 100!');
      }
      
    }

    public onSaveClicked(): void {
      if(this.name.value !== "" && this.price.value !== null &&
       this.category.value !== "" && this.selectedFile.name !== ""){
         this.isShownErrorMessage = false;
        this.onUploadImage();
        let newProductDetails = {
          productName: this.name.value,
          price: this.price.value,
          picture: this.selectedFile.name,
          category: this.category.value
        } 

        console.log(newProductDetails,'obiectititieoireoriqj');

        const observable = this.adminService.addNewProductItem(newProductDetails);
  
        observable.subscribe(newProducts => {
          console.log(newProducts);
          this.shareService.getCartItems();
          this.refresh = true;
          this.shareService.inItemsConfigDivShown = false;
        }, serverErrorResponse => {
          console.log("Error 75!" + serverErrorResponse);
      });
    } else {
      this.isShownErrorMessage = true;
      this.errorMessage="*Please field all empty fields";
    }
    }
}

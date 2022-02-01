import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsDetails } from 'src/app/models/ProductsDetails';
import { ShareDataService } from 'src/app/services/share-data.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public dialog: MatDialog, public shareDataService: ShareDataService, public router: Router){}

  @Input() product: ProductsDetails = new ProductsDetails(); 
  @Input() getCartItems!: Function;
  
  public url: string = "http://localhost:3001/uploads/";

  public openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, 
      { height: '300px',
        width: '400px',
        data: { id: this.product.product_id,
                name: this.product.name,
                picture: this.product.picture,
                price: this.product.price,
                getCartItems: this.getCartItems     
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public onClickCurrentItem(): void {
      this.shareDataService.isShownClickedItem = true;
      this.shareDataService.inItemsConfigDivShown = false;
      this.shareDataService.productInfo = {
        id: this.product.product_id,
        name: this.product.name,
        picture: this.product.picture,
        price: this.product.price,
        category: this.product.category  
      }
      console.log(this.shareDataService.productInfo,'d454545ddddddddd');

  }

  ngOnInit(): void {
    if(this.router.url.includes('/admin')) {
      this.shareDataService.isAdminProduct = true;
    }
  }



}

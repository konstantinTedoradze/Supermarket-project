import { Component, OnInit } from '@angular/core';
import { ProductsDetails } from 'src/app/models/ProductsDetails';
import { ProductsService } from 'src/app/services/products-service.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  
  constructor(public productsService: ProductsService, public shareData: ShareDataService, public usersService: UsersService ) { }
  
  public url2: string = "../../../assets/img/grocery2.jpg";

  ngOnInit(): void {
      this.shareData.allProducts();
      this.shareData.allOrders();  
      if(sessionStorage.userType == 'CUSTOMER') {
        this.shareData.isShownNotification = true;
        this.shareData.lastPurchase();
        this.shareData.openCartDate();
      } else {
        this.shareData.isShownNotification = false;
      }
      console.log(sessionStorage.userType,'11111111111111111');
  }

}

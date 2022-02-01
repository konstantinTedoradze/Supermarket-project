import { Component, OnInit } from '@angular/core';
import { ReceiptDetails } from 'src/app/models/ReceiptDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor(public shareService: ShareDataService, public ordersService: OrdersService) { }

  public download() : void {
    console.log(this.shareService.Cartitems,"mashebbahartii");

    const body = {
      item: this.shareService.Cartitems,
      sum: this.shareService.sum
    }

    const observable = this.ordersService.getReceipt(body);

    observable.subscribe(response => {
      console.log(response);
      // const blob = new Blob(response)
      saveAs(response);
    }, serverErrorResponse => {
      console.log("Error 31!" + serverErrorResponse);
    })
  }


  ngOnInit(): void {
  }

}



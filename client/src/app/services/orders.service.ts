import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/OrderDetails';
import { ReceiptDetails } from '../models/ReceiptDetails';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public addOrderData(ordersDetails: OrderDetails): Observable<OrderDetails>{
   
    return this.http.post<OrderDetails>("http://localhost:3001/orders", ordersDetails);
  }  

  public getReceipt(body: any): Observable<any>{
    return this.http.post<any>("http://localhost:3001/download", body, 
    {responseType: "blob" as "json",headers: {'Accept': 'application/txt'}});
  }
 
  public getAllOrders():  Observable<any>{
    return this.http.get<any>("http://localhost:3001/orders/length");
  }  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemDetails } from '../models/CartItemDetails';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartsService {

  constructor(private http: HttpClient) {}
  public Cartitems: any = [];

  public getCartItem(cartItemDetail: any): Observable<any>{
    const id = cartItemDetail.id;
    console.log('details in client',id);
    const body = {'quantity': cartItemDetail.quantity}

    return this.http.post<any>(`http://localhost:3001/shoppingCarts/${id}`,body);
  }

  public getAllCartsItems(): Observable<CartItemDetails[]>{
    return this.http.get<CartItemDetails[]>("http://localhost:3001/shoppingCarts/cartItems");
  } 
  
  public deleteCurrentItem(id: number): Observable<any>{
    const cartItemId = id;
    return this.http.delete<any>(`http://localhost:3001/shoppingCarts/cartItem/${cartItemId}`);
  } 
  
  public getlastCartDate(): Observable<any>{
    return this.http.get<any>("http://localhost:3001/shoppingCarts/getlastCartDate");
  }

 
}

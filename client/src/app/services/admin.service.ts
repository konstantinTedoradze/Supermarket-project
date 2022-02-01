import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public addNewProductItem(newProductDetails: any): Observable<any>{
   
    return this.http.post<any>("http://localhost:3001/admin/createNewProduct", newProductDetails);
  }  

  public updateProductItem(productDetails: any): Observable<any>{
   
    return this.http.put<any>("http://localhost:3001/admin/updateProduct", productDetails);
  }  
}

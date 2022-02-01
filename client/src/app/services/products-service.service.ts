import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDetails } from '../models/CagegoryDetails';
import { ProductsDetails } from '../models/ProductsDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<ProductsDetails[]>{
   
    return this.http.get<ProductsDetails[]>("http://localhost:3001/products");
  }  

  public getAllCategories(): Observable<CategoryDetails[]>{
    return this.http.get<CategoryDetails[]>("http://localhost:3001/products/categories");
  }  

  public getCurrentProducts(categoryName: string): Observable<ProductsDetails[]>{
    const strParams = encodeURIComponent(categoryName);
    return this.http.get<ProductsDetails[]>(`http://localhost:3001/products/byCategories?category=${strParams}`);
  }  

  public getProductsFillterdByName(productName: string): Observable<ProductsDetails[]>{
    const strParams = encodeURIComponent(productName);

    return this.http.get<ProductsDetails[]>(`http://localhost:3001/products/byFilter?searchName=${strParams}`);
  }
}

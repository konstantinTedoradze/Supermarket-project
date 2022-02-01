import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessfullLoginServerResponse } from '../models/SuccessfullLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private loginToken: any;

  constructor(private http: HttpClient) { }

  public register(registerDetails: UserRegisterDetails): Observable<any>{
    return this.http.post<any>("http://localhost:3001/users/", registerDetails);
  }

  public checkIdUnique(id: number): Observable<any>{
    return this.http.get<any>(`http://localhost:3001/users/unique/${id}`);
  }

  public checkEmailUnique(email: any): Observable<any>{
    return this.http.get<any>(`http://localhost:3001/users/uniqueEmail/${email}`);
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfullLoginServerResponse>{
   
    return this.http.post<SuccessfullLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }  

  public getLastPurchaseDate(): Observable<any>{
    return this.http.get<any>("http://localhost:3001/users/getLastPurchaseDate");
  }

  public getUserCity(): Observable<any>{
    return this.http.get<any>("http://localhost:3001/users/city"); 
  }  

  public getUserStreet(): Observable<any>{
    return this.http.get<any>("http://localhost:3001/users/street");
  
  } 

  public getLoginToken(name: string): any{
    return this.loginToken = sessionStorage.getItem(name);
  }

  public setLoginToken(name: string,token: string) : void {
      this.loginToken = sessionStorage.setItem(name,token);
  }

}

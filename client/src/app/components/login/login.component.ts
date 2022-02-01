import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessfullLoginServerResponse } from 'src/app/models/SuccessfullLoginServerResponse';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public userloginForm!: FormGroup;
    public email!: FormControl;
    public password!: FormControl;
  
    public userLoginDetails: UserLoginDetails;
    public shopingDisabled: boolean = true;
    public errorMessage: string = '';
  
  constructor(public usersService: UsersService, 
    private router: Router, public shareData: ShareDataService) { 
    this.userLoginDetails = new UserLoginDetails();
    this.usersService = usersService;
  }

  public onLoginClicked = () : void => {
    this.userLoginDetails.email = this.email.value;
    this.userLoginDetails.password = this.password.value;
    const observable = this.usersService.login(this.userLoginDetails);
    console.log(this.userLoginDetails,'loginnnnnnn');
    observable.subscribe((SuccessfullServerRequestData: any) => {

      this.usersService.setLoginToken('token',"Bearer " + SuccessfullServerRequestData.token);
      this.usersService.setLoginToken('userType', SuccessfullServerRequestData.userType);
      this.usersService.setLoginToken('userName', SuccessfullServerRequestData.firstname);
     
      this.shopingDisabled = false;
      this.shareData.isShownName = true;
      this.shareData.userName = this.usersService.getLoginToken("userName");
      this.shareData.allProducts();
      this.shareData.isShownNotification = true;
      this.shareData.lastPurchase();
      this.shareData.openCartDate();

    }, (serverErrorResponse : any) => {
      this.router.navigate(["/api/admin"]);
      this.errorMessage = "*Invalid email or password";
      console.log("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);   
    });
  }
  
  public onClickStartShoping = () : void => {
    let userType = this.usersService.getLoginToken("userType");
    if(userType == "ADMIN"){
      this.router.navigate(["/admin"]);
      this.shareData.isAdminProduct = true;
    } else if(userType == "CUSTOMER"){
      this.router.navigate(["/home"]);
      this.shareData.isAdminProduct = false;
    }else {
      this.router.navigate(["/login"]);
    }
  }

  public onRegisterClicked = () : void => {
    this.router.navigate(["/register"]);
    console.log("/registerrrrrrrrrrrrrrrrrrrr");
  }
 
  ngOnInit(): void {
    this.email = new FormControl("", [Validators.required,Validators.minLength(8)]);
    this.password = new FormControl("", [Validators.required,Validators.minLength(5)]);
    
    // Initializing the from group
    this.userloginForm = new FormGroup({
        email : this.email,
        password : this.password
    });

    if(sessionStorage.token) {
      this.shareData.userName = this.usersService.getLoginToken("userName");
      this.shopingDisabled = false;
      this.shareData.isShownName = true;
    } 
  
  }
  
}

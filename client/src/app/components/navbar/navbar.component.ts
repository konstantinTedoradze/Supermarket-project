import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public url: string = "../../../assets/img/logo.jpg";
  public isShownSearchBar: boolean = false;

  constructor(private router: Router, public shareData: ShareDataService){
    if(sessionStorage.length !== 0 && window.location.href === 'home'){
      this.isShownSearchBar = true;
    }
  }

  public onClickLogo() : void {
      this.router.navigate(["/login"]);
  }
  
  ngOnInit(): void {
    
    console.log(this.shareData.isShownName,'shownName navbar');
    console.log(window.location.href);
    
    if(window.location.href == "http://localhost:4200/login") {
      this.shareData.isShownDiv = true;
    }
  }

}


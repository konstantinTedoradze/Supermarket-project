import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  
  public url: string = "../../../assets/img/grocery.jpg";
  
  constructor() { }
 
  ngOnInit(): void {
  }

}

import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() categoryArray: any;
  public  panelOpenState = false;
  public selectedFile: any = null;
  public currentCategoryName: any;
  public picture: string = '';
  constructor(public shareDataService: ShareDataService,private http: HttpClient,
     public adminService: AdminService) { }

  public onPictureSelected(event: any):void {
    this.shareDataService.productInfo.picture = <File>event.target.files[0].name;
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile,'rusalkaaaa');
  }

  ngOnInit(): void {
    
    console.log(this.categoryArray,'aaaaaaaaaaaaa');
  }

  public onUploadImage() {
    const fd = new FormData();
    if(this.selectedFile !== null){
      this.shareDataService.productInfo.picture = this.selectedFile.name;

      console.log(this.selectedFile.name,this.selectedFile,'jumberikokoo');
      fd.append('file',this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3001/uploads',fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event: HttpEvent<any>) => {
      if(event.type === HttpEventType.UploadProgress && event.total !== undefined) {
        console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100)  + '%');
      } else if(event.type === HttpEventType.Response){
        console.log(event);
      }
      console.log(event);
    });
    }
   
  }

  public onUpdateProductsData():void {
  
    let updateProductInfo = {
      id: this.shareDataService.productInfo.id,
      name: this.shareDataService.productInfo.name,
      price: this.shareDataService.productInfo.price,
      picture: this.shareDataService.productInfo.picture,
      category: this.shareDataService.productInfo.category
    }
    console.log(updateProductInfo,'murtootoo');

    if(updateProductInfo.name.value !== '' && updateProductInfo.category !== ''
      && updateProductInfo.price !== ''){
          this.onUploadImage();
  
      const observable = this.adminService.updateProductItem(updateProductInfo);

      observable.subscribe(newProducts => {
        console.log(newProducts,"11111111111111111111111111");
        this.shareDataService.inItemsConfigDivShown = false;
        this.shareDataService.isShownClickedItem = false;
        this.shareDataService.refreshAdminComponent = true;
        this.shareDataService.getCartItems();
      }, serverErrorResponse => {
        console.log("Error 79!" + serverErrorResponse);
    });
    } else {
      console.log("errorrrrrrr!!")
    }
    

    }
    
  }

 
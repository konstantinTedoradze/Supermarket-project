import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';
import { ProductsDetails } from '../models/ProductsDetails';

@Pipe({
    name: 'subTextPipe'
})

export class ProductsSubTextPipe implements PipeTransform {
    // transform(value: any, freeText: any): any {
    //     if (!freeText) {
    //       return value;
    //     }
    
    //     const regex = new RegExp(freeText, 'gi');
    //     const match = value.match(regex);
    
    //     if (!match) {
    //       return value;
    //     }
    
    //     return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
    // }

    
    
    transform(products: any, freeText: string): any {
        let productsName = products.filter((products: any) => 
        products.name.toLowerCase().includes(freeText.toLowerCase()));
        console.log(productsName,'kkkkkkkkkkkkkkkkkkkkkkkkk');
      
        return productsName;        
    }
}

export class ProductsDetails {
    
    public constructor(
        public product_id?: number,
        public name: string = '',
        public price: number = 0,
        public picture?: string,
        public category?: string
    ){} 

}
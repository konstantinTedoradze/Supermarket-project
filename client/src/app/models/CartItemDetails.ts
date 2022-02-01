export class CartItemDetails {
    
    public constructor(
        public id?: number,
        public quantity?: number,
        public productId?: number,
        public name?: string,
        public price?: number,
        public picture?: string
    ){}

}
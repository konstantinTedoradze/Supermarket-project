export class OrderDetails {
    
    public constructor(
        public sum?: number,
        public deliveryDate?: string,
        public lastDigit?: number,
        public deliveryCity?: string,
        public deliveryStreet?: string
    ){}

}
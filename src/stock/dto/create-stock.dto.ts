export class CreateStockDto {
    quantity: number;
    restockThreshold: number;
    boughtFrom: string;
    boughtFor: string;
    productID: number;
}

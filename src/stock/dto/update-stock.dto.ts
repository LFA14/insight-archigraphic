export class UpdateStockDto {
    quantity?: number;
    restockThreshold?: number;
    boughtFrom?: string;
    boughtFor?: number;
    productID?: number;
}

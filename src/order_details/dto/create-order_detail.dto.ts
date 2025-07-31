import { IsMongoId, IsNotEmpty, IsOptional, Min } from "class-validator";

export class CreateOrderDetailDto {
    @IsNotEmpty()
    @IsMongoId()
    orderId: string;

    @IsNotEmpty()
    @IsMongoId()
    productId: string;

    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsOptional()
    price: number;
}

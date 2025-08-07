import { IsArray, IsNotEmpty, IsNumber, IsString, Min, IsOptional } from "class-validator";

export class OrderItem {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    sellerId: string;

    @IsArray()
    items: Array<OrderItem>;

    @IsOptional()
    @IsString()
    discountCode?: string;
}

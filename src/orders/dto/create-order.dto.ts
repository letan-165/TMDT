import { IsArray, IsNotEmpty, IsNumber, IsString, Min, IsOptional } from "class-validator";

export class OrderItem {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsArray()
    items: Array<OrderItem>;

}

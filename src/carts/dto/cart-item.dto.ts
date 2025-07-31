import { Transform } from "class-transformer";
import { IsInt, IsMongoId, IsNotEmpty, Min } from "class-validator";
import { Types } from "mongoose";


export class CartItemDto {
    @IsNotEmpty()
    @IsMongoId()
    productId: string;

    @IsInt()
    @Min(1)
    quantity: number;
}
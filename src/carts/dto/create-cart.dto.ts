import { IsMongoId, IsNotEmpty, ValidateNested } from "class-validator";
import { CartItemDto } from "./cart-item.dto";
import { Type } from "class-transformer";

export class CreateCartDto {
    @IsNotEmpty()
    userId: string;

    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    items: CartItemDto[];
}

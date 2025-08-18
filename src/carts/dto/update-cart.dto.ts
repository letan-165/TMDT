import { IsOptional } from "class-validator";
import { CartItemDto } from "./cart-item.dto";

export class UpdateCartDto{
    @IsOptional()
    items: CartItemDto[];
}

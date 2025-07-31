import { CreateOrderDetailDto } from "@/order_details/dto/create-order_detail.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;

    @IsNotEmpty()
    totalAmount: number;

    @IsNotEmpty()
    orderDetails: CreateOrderDetailDto[];
}

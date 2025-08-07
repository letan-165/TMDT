import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    amount: number;
}

import { IsArray, IsNotEmpty, IsString, IsNumber, IsOptional, Min } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    orderIds: string[]; // Mảng các order IDs

    @IsNotEmpty()
    @IsNumber()
    @Min(1000) // Tối thiểu 1000 VND
    amount: number; // Tổng số tiền (VND)

    @IsOptional()
    @IsString()
    ipAddr?: string; // IP address của user

    @IsOptional()
    @IsString()
    description?: string; // Mô tả thanh toán

    @IsOptional()
    @IsString()
    returnUrl?: string; // URL return tùy chỉnh
}

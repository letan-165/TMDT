import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, Min, IsBoolean } from 'class-validator';

export class CreateDiscountDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    value: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    minOrder?: number;

    @IsOptional()
    @IsNumber()
    maxDiscount?: number;

    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    expiryDate: string;

    @IsNotEmpty()
    @IsString()
    sellerId: string;
}
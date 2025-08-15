import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, Min, IsBoolean } from 'class-validator';

export class CreateDiscountDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    value: number;

  
}
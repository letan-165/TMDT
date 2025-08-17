import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, Min, IsBoolean } from 'class-validator';

export class CreateDiscountDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    value: number;

    @IsNotEmpty()
    @IsString()
    createdBy: string;
}
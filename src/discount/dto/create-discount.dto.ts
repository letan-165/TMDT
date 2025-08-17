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

    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate: Date;

    @IsNotEmpty()
    @IsString()
    createdBy: string;
}
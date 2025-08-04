import { IsString, IsNumber, IsOptional, IsBoolean, IsMongoId, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    image?: string;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    stock?: number = 0;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsMongoId()
    @IsNotEmpty()
    categoryId: string;

    @IsMongoId()
    @IsNotEmpty()
    sellerId: string;
}

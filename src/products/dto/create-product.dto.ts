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
    images?: [string];

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    stock: number;

    @IsMongoId()
    @IsNotEmpty()
    categoryId: string;

    @IsMongoId()
    @IsNotEmpty()
    sellerId: string;
}

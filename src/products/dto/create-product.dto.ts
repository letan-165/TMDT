import { IsString, IsNumber, IsOptional, IsBoolean, IsMongoId, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
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
    @IsString()
    brand?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @IsMongoId()
    categoryId: string;
}

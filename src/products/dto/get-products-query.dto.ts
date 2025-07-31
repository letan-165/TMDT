import { IsOptional, IsString, IsNumber, IsBoolean, IsMongoId } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class GetProductsQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsMongoId()
    categoryId?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxPrice?: number;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc' = 'desc';
}

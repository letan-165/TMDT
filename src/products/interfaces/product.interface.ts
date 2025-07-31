import { Product } from '../schemas/product.schema';
import { IsNumber, IsEnum, Min } from 'class-validator';

export interface ProductResponse {
    success: boolean;
    data: Product | Product[];
    message: string;
}

export interface ProductListResponse {
    success: boolean;
    data: {
        products: Product[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
    message: string;
}

export class StockUpdateDto {
    @IsNumber()
    @Min(0)
    quantity: number;

    @IsEnum(['increase', 'decrease', 'set'])
    operation: 'increase' | 'decrease' | 'set';
}

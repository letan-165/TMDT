import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountDto } from './create-discount.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

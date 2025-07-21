import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountCodeDto } from './create-discount_code.dto';

export class UpdateDiscountCodeDto extends PartialType(CreateDiscountCodeDto) {}

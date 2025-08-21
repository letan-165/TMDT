import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../enum/status.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto{
    @IsNotEmpty()
    status: OrderStatus;
}

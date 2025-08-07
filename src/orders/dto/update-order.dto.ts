import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../enum/status.enum';

export class UpdateOrderDto{
    status?: OrderStatus;
}

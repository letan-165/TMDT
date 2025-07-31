import { OmitType,  } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends OmitType(CreateCartDto, ['userId']) {
}

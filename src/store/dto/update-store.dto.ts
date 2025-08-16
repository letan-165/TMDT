
import { CreateStoreDto } from './create-store.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateStoreDto extends OmitType(CreateStoreDto, ['userId']) {}

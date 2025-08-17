
import { CreateStoreDto } from './create-store.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateStoreDto extends PartialType(OmitType(CreateStoreDto, ['userId'])) {}

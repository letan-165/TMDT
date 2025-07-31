import { IsString, IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    tags?: string[];

}

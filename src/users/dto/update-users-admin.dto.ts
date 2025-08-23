import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUsersAdminDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsOptional()
    @IsPhoneNumber("VN")
    phone?: string;
}
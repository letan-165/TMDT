import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}

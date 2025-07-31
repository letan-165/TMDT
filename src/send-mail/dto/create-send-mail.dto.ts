import { IsNotEmpty } from "class-validator";

export class CreateSendMailDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    name: string;
}

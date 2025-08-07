import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class CallbackVnpayDto {
    @IsString()
    vnp_TransactionNo: string;

    @IsString()
    method: string;
}

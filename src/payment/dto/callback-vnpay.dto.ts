import { IsString, IsNumberString, IsOptional } from 'class-validator';

export class VnpayCallbackDto {
  @IsString()
  vnp_TxnRef: string;          // Mã đơn hàng

  @IsNumberString()
  vnp_Amount: string;          // Số tiền (string số, cần convert sang number/100)

  @IsString()
  vnp_TransactionNo: string;   // Mã giao dịch tại VNPAY

  @IsString()
  vnp_BankCode: string;

  @IsString()
  vnp_CardType: string;

  @IsString()
  vnp_ResponseCode: string;    // 00 = thành công

  @IsOptional()
  @IsString()
  vnp_TransactionStatus?: string;

  @IsOptional()
  @IsString()
  vnp_OrderInfo?: string;

  @IsOptional()
  @IsString()
  vnp_PayDate?: string;

  @IsOptional()
  @IsString()
  vnp_SecureHash?: string;     // chỉ verify, không lưu DB
}

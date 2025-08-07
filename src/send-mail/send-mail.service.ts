import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { SendMailToSellerDto } from './dto/send-mail-seller.dto';

@Injectable()
export class SendMailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) { }
    async sendMail(user: CreateSendMailDto) {
        const url = this.configService.get<string>('URL_CONTACT'); // url logo
        const brand = this.configService.get<string>('BRAND_NAME'); // tên thương hiệu
        const policy = this.configService.get<string>('POLICY'); // link chính sách bảo mật
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Account verification',
                template: 'verification',
                context: {
                    name: user.name,
                    url,
                    brand,
                    policy,
                    code: user.code,
                }
            })
            console.log('Email sent successfully');
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }

    }

    // 🔥 NEW: Gửi email cho seller khi có đơn hàng mới
    async sendNewOrderNotificationToSeller(sellerData: SendMailToSellerDto) {
        const url = this.configService.get<string>('URL_CONTACT'); // url logo
        const brand = this.configService.get<string>('BRAND_NAME'); // tên thương hiệu
        const policy = this.configService.get<string>('POLICY'); // link chính sách bảo mật
        const adminUrl = this.configService.get<string>('ADMIN_URL') || 'http://localhost:3000/admin'; // URL trang admin

        try {
            await this.mailerService.sendMail({
                to: sellerData.email,
                subject: `🛍️ Đơn hàng mới #${sellerData.orderNumber} - ${brand}`,
                template: 'new-order-seller',
                context: {
                    ...sellerData,
                    url,
                    brand,
                    policy,
                    adminUrl
                }
            });
            console.log(`✅ Email sent successfully to seller: ${sellerData.email} for order #${sellerData.orderNumber}`);
        } catch (error) {
            console.error(`❌ Failed to send email to seller ${sellerData.email}:`, error.message);
            throw new Error(`Failed to send email to seller: ${error.message}`);
        }
    }
}

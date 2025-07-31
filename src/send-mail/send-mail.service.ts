import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateSendMailDto } from './dto/create-send-mail.dto';

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
}

export class SendMailToSellerDto {
    email: string;
    name: string;
    orderNumber: string;
    orderDate: string;
    status: string;
    paymentMethod: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress?: string;
    sellerItems: Array<{
        name: string;
        quantity: number;
        price: number;
        total: number;
    }>;
    sellerTotal: number;
    adminUrl?: string;
}

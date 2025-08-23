export interface ProductRequest {
  name: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  categoryId?: string;
  discountId?: string;
  sellerId: string;
}

export interface OrderItemRequest {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderRequest {
  userId: string;
  items: OrderItemRequest[];
}

export interface CallBack {
  vnp_TxnRef: string;          // Mã đơn hàng
  vnp_Amount: string;          
  vnp_TransactionNo: string;   // Mã giao dịch tại VNPAY
  vnp_BankCode: string;
  vnp_CardType: string;
  vnp_ResponseCode: string;    // 00 = thành công
  vnp_TransactionStatus: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_SecureHash: string;
}
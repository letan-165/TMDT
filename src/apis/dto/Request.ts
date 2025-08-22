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
  sellerId: string;
}

export interface OrderRequest {
  userId: string;
  items: OrderItemRequest[];
}

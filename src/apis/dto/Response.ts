export interface Discount {
  _id: string;
  name: string;
  code: string;
  value: number;
}

export interface Category {
  _id: string;
  name: string;
  tags: string[];
}
export interface Store {
  _id: string;
  name: string;
  address: string;
}

export interface Product {
  _id: string;
  categoryId: Category;
  storeId: Store;
  sellerId: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  finalPrice: number;
  haveDiscount: boolean;
  stock: number;
  status: boolean;
  discountId: Discount | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductsResponse {
  products: Product[];
  totalPages: number;
}

export interface CategoryResponse {
  categories: Category[];
  totalPages: number;
}
export interface DiscountResponse {
  discounts: Discount[];
  totalPages: number;
}

export interface Profile {
  userId: string;
  email: string;
  role: string;
  iat: string;
}
export interface User {
  username: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

export interface CartItem {
  productId: Product;
  quantity: number;
  selected: boolean;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}
export interface Order {
  _id: string;
  userId: string;
  sellerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export type OrderResponse = Order[];

export interface PaymentResponse {
  paymentId: string;
  paymentUrl: string;
  orderIds: string[];
  amount: number;
  txnRef: string;
}

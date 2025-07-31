# Products API Documentation

## Endpoints

### 1. Tạo sản phẩm mới
```
POST /products
```

**Body:**
```json
{
  "name": "iPhone 15",
  "description": "Điện thoại thông minh cao cấp",
  "image": "https://example.com/image.jpg",
  "price": 25000000,
  "stock": 100,
  "brand": "Apple",
  "isActive": true,
  "categoryId": "64f123456789abcdef123456"
}
```

### 2. Lấy danh sách sản phẩm (với filtering)
```
GET /products?search=iphone&categoryId=123&page=1&limit=10
```

**Query Parameters:**
- `search`: Tìm kiếm theo tên, mô tả, thương hiệu
- `categoryId`: Lọc theo danh mục
- `brand`: Lọc theo thương hiệu
- `minPrice`: Giá tối thiểu
- `maxPrice`: Giá tối đa
- `isActive`: Trạng thái hoạt động (true/false)
- `page`: Trang hiện tại (mặc định: 1)
- `limit`: Số items mỗi trang (mặc định: 10)
- `sortBy`: Sắp xếp theo field (mặc định: createdAt)
- `sortOrder`: Thứ tự sắp xếp (asc/desc, mặc định: desc)

### 3. Lấy sản phẩm theo ID
```
GET /products/:id
```

### 4. Cập nhật sản phẩm
```
PATCH /products/:id
```

**Body:** (Tất cả fields đều optional)
```json
{
  "name": "iPhone 15 Pro",
  "price": 30000000,
  "stock": 50
}
```

### 5. Xóa sản phẩm
```
DELETE /products/:id
```

### 6. Tìm kiếm sản phẩm
```
GET /products/search?q=iphone&limit=5
```

### 7. Lấy sản phẩm nổi bật
```
GET /products/featured?limit=10
```

### 8. Lấy sản phẩm sắp hết hàng
```
GET /products/low-stock?threshold=10
```

### 9. Lấy sản phẩm theo danh mục
```
GET /products/category/:categoryId?limit=10
```

### 10. Lấy sản phẩm liên quan
```
GET /products/:id/related?limit=5
```

### 11. Cập nhật tồn kho nâng cao
```
PATCH /products/:id/stock
```

**Body:**
```json
{
  "quantity": 10,
  "operation": "increase" // "increase", "decrease", "set"
}
```

### 12. Bật/tắt trạng thái sản phẩm
```
PATCH /products/:id/toggle-status
```

## Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Product data or array of products
  },
  "message": "Success message"
}
```

**List Response with Pagination:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  },
  "message": "Success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400
}
```

## Validation Rules

### CreateProductDto
- `name`: Required, string
- `description`: Optional, string
- `image`: Optional, string (URL)
- `price`: Required, number, min: 0
- `stock`: Optional, number, min: 0, default: 0
- `brand`: Optional, string
- `isActive`: Optional, boolean, default: true
- `categoryId`: Required, valid MongoDB ObjectId

### StockUpdateDto
- `quantity`: Required, number, min: 0
- `operation`: Required, enum: ['increase', 'decrease', 'set']

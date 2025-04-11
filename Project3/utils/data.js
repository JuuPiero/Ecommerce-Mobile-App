
const products = [
    {
      id: 1,
      category_id: 1,
      name: "Laptop Gaming",
      sku: "LAP001",
      description: "Laptop gaming mạnh mẽ với RTX 4060.",
      price: "1299.99",
      quantity: 5,
      status: 1,
      created_at: "2025-04-04T10:00:00Z",
      updated_at: "2025-04-04T10:00:00Z",
      images: [
        { id: 101, name: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-msi-gaming-thin-a15-b7ucx-020vn.png" },
        { id: 102, name: "https://bizweb.dktcdn.net/thumb/large/100/386/607/products/msi-thin-a15-cong-ket-noi-trai-66a3ce0c-2a99-47b0-9bb9-5871bca7993c.jpg?v=1721492762783" },
        { id: 103, name: "https://product.hstatic.net/200000722513/product/ava_f8aaa663e7ba48379e22c4d0ea6d1e8f_1024x1024.png" }
       
      ],
      attributes: [
        { name: "RAM", value: "16GB" },
        { name: "CPU", value: "Intel i7" }
      ]
    },
    {
      id: 2,
      category_id: 2,
      name: "Bàn phím cơ RGB",
      sku: "KEYB001",
      description: "Bàn phím cơ với switch Gateron Brown.",
      price: "89.99",
      quantity: 20,
      status: 1,
      created_at: "2025-04-04T11:00:00Z",
      updated_at: "2025-04-04T11:00:00Z",
      images: [
        { id: 103, name: "https://picsum.photos/300/200?random=3" },
        { id: 104, name: "https://picsum.photos/300/200?random=4" }
      ],
      attributes: [
        { name: "Switch", value: "Gateron Brown" },
        { name: "LED", value: "RGB" }
      ]
    },
    {
      id: 3,
      category_id: 3,
      name: "Tai nghe Bluetooth",
      sku: "HEAD001",
      description: "Tai nghe không dây chống ồn chủ động.",
      price: "199.99",
      quantity: 15,
      status: 1,
      created_at: "2025-04-04T12:00:00Z",
      updated_at: "2025-04-04T12:00:00Z",
      images: [
        { id: 105, name: "https://picsum.photos/300/200?random=5" },
        { id: 106, name: "https://picsum.photos/300/200?random=6" }
      ],
      attributes: [
        { name: "Pin", value: "40 giờ" },
        { name: "Chống ồn", value: "Có" }
      ]
    },
    {
      id: 4,
      category_id: 4,
      name: "Chuột Gaming",
      sku: "MOUSE001",
      description: "Chuột gaming có cảm biến quang học 16000DPI.",
      price: "59.99",
      quantity: 30,
      status: 1,
      created_at: "2025-04-04T13:00:00Z",
      updated_at: "2025-04-04T13:00:00Z",
      images: [
        { id: 107, name: "https://picsum.photos/300/200?random=7" },
        { id: 108, name: "https://picsum.photos/300/200?random=8" }
      ],
      attributes: [
        { name: "DPI", value: "16000" },
        { name: "Kết nối", value: "USB-C" }
      ]
    },
    {
      id: 5,
      category_id: 5,
      name: "Màn hình 4K",
      sku: "MON001",
      description: "Màn hình 4K 144Hz cho trải nghiệm mượt mà.",
      price: "499.99",
      quantity: 10,
      status: 1,
      created_at: "2025-04-04T14:00:00Z",
      updated_at: "2025-04-04T14:00:00Z",
      images: [
        { id: 109, name: "https://picsum.photos/300/200?random=9" },
        { id: 110, name: "https://picsum.photos/300/200?random=10" }
      ],
      attributes: [
        { name: "Tần số quét", value: "144Hz" },
        { name: "Độ phân giải", value: "4K" }
      ]
    }
];

export {
    products
}
  
import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"
import ProductItem from "../../components/customer/ProductItem";
import DefaultLayout from "../../layouts/customer/DefaultLayout";
import CategorySlider from "../../components/customer/CategorySlider";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const products = [
    {
      id: 1,
      category_id: 1,
      name: "Laptop Gaming",
      sku: "LAP001",
      description: "Laptop gaming mạnh mẽ với RTX 4060.",
      price: "200000000000000.00",
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
        { id: 103, name: "https://hanoicomputercdn.com/media/product/71738_ban_phim_co_gaming_lecoo_gk302_blue_switch_led_rgb_4.jpg" },
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
        { id: 105, name: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/54/330710/tai-nghe-bluetooth-true-wireless-ava-freego-pt52-081024-050122-178-600x600.jpg" },
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
        { id: 107, name: "https://www.tncstore.vn/media/product/250-8824-razer-basilisk-v3---rz01-04000100-r3m1-1.jpg" },
        { id: 108, name: "https://www.tncstore.vn/media/product/250-8819-razer-basilisk-v3-x-hyperspeed---rz01-04870100-r3a1-1.jpg" }
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
        { id: 109, name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2yRPBxILaXSHVWMSW0yPHw_v46i_MyUr6BQ&s" },
        { id: 110, name: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/11/man-hinh-4k.jpg" }
      ],
      attributes: [
        { name: "Tần số quét", value: "144Hz" },
        { name: "Độ phân giải", value: "4K" }
      ]
    }
  ];
  

export default function Home() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(true);
    
    const onRefresh = async () => {
        // 
        setRefreshing(false)
    };
    useEffect(() => {
        onRefresh()
    }, [])


    return (
        <DefaultLayout onRefresh={onRefresh} refreshing={refreshing}>
            <CategorySlider />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 10
            }}>
                {
                    products.map(product =>  <ProductItem key={product.id} product={product} />)
                }


                {/* <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem /> */}
            </View>
          
            <Button mode="contained" onPress={() => {
                navigation.replace("Admin");
            }}>Test chuyển sang admin</Button>
        </DefaultLayout>
    )
}
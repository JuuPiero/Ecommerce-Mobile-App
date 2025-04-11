
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class CartManager {
    static key = 'cart'

    static async get() {
        const cart = await AsyncStorage.getItem(this.key) ?? "[]"
        // cart = JSON.parse(cart)
        return JSON.parse(cart)
    }

    static async clear() {
        await AsyncStorage.setItem(this.key, [])
    }
    static async save(cart) {
        await AsyncStorage.setItem(this.key, JSON.stringify(cart))
    }

    static async add(product, quantity = 1) {
        // AsyncStorage.clear()
        const cart = await this.get()
        for (const item of cart) {
            if(item.id == product.id) {
                item.quantity += quantity
                await AsyncStorage.setItem(this.key, JSON.stringify(cart))
                // console.log(this.#cart);
                return
            }
        }
        cart.push({
            id: product.id,
            product,
            quantity
        })
        // console.log(cart);
        await AsyncStorage.setItem(this.key, JSON.stringify(cart))
    }
} 

import AsyncStorage from "@react-native-async-storage/async-storage";

// [
//     {
//         id: 1
//         product : product,
//         quantity : 2
//     }
// ]
// {
//     {product : quantity}
// }

export default class CartManager {
    #key = 'cart'
    constructor() {
        // AsyncStorage.setItem(this.#key, [])
    }

    get() {
        const cart = JSON.parse(AsyncStorage.getItem(this.#key)) ?? []
        return cart  
    }

    clear() {
        AsyncStorage.setItem(this.#key, [])
    }

    add(product, quantity = 1) {
        const cart = this.get()

        // for (const element of object) {
            
        // }

        cart.forEach(item => {
            if(item.id === product.id) {

            }
        });
        // cart.push()

        // AsyncStorage.setItem('ca')
    }
} 
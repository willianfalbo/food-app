import { CartItem } from "./shopping-cart.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {

    items: CartItem[] = []

    clear() {
        //reset array
        this.items = []
    }

    addItem(item: MenuItem) {
        //check if item already exists
        let foundItem = this.items.find((x) => x.menuItem.id === item.id)
        if (foundItem) {
            //update quantity
            this.increaseQty(foundItem)
        } else {
            //add new item
            this.items.push(new CartItem(item))
        }
    }

    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem) {
        item.quantity = item.quantity - 1

        if (item.quantity === 0) {
            this.removeItem(item)
        }
    }

    removeItem(item: CartItem) {
        //remove item from
        this.items.splice(this.items.indexOf(item), 1)
    }

    total(): number {
        //sum all items from the cart list
        return this.items
            .map(x => x.value())
            .reduce((prev, value) => prev + value, 0)
    }
}

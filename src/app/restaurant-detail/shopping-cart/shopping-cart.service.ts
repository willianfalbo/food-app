import { Injectable } from "@angular/core";

import { CartItem } from "./shopping-cart.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { NotificationService } from "app/shared/messages/notification.service";

@Injectable()
export class ShoppingCartService {

    items: CartItem[] = []

    constructor(private notificationService: NotificationService){}

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
        this.notificationService.notify(`Você adicionou o item ${item.name}`)
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
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number {
        //sum all items from the cart list
        return this.items
            .map(x => x.value())
            .reduce((prev, value) => prev + value, 0)
    }
}

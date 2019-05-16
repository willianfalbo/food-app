import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { MEAT_API } from "app/app.api";

import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/shopping-cart.model";
import { Order } from "./order.model";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient) { }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }

    clear() {
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .pipe(map(order => order.id))
    }

}
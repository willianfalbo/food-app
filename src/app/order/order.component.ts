import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { RadioOption } from 'app/shared/radio/radio-option.model';

import { OrderService } from './order.service';

import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  //regex
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  //fixed price
  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MONEY" },
    { label: "Cartão de Débito", value: "DEBIT_CARD" },
    { label: "Cartão de Crédito", value: "CREDIT_CARD" },
    { label: "Cartão de Refeição", value: "MEAL_VOUCHER" }
  ]

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, { validator: OrderComponent.equalsTo })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }

    return undefined
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
    console.log(order)
  }

}

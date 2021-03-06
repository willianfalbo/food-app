import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { tap } from 'rxjs/operators';

import { OrderService } from './order.service';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  // regex
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderForm: FormGroup;

  delivery = 8; // fixed price
  orderId: string;

  paymentOptions: RadioOption[] = [
    { label: 'Cash Money', value: 'MONEY' },
    { label: 'Debit Card', value: 'DEBIT_CARD' },
    { label: 'Credit Card', value: 'CREDIT_CARD' },
    // { label: 'Meal Card', value: 'MEAL_VOUCHER' },
  ]

  constructor(
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    this.orderForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailPattern)],
          // updateOn: 'blur'
        }),
        emailConfirmation: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailPattern)],
          // updateOn: 'blur'
        }),
        address: new FormControl('', [Validators.required, Validators.minLength(5)]),
        number: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
        optionalAddress: new FormControl(''),
        paymentOption: new FormControl('', [Validators.required]),
      },
      {
        validators: [this.equalEmails], updateOn: 'change'
      });
  }

  equalEmails(group: AbstractControl): { [key: string]: boolean } {
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

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

  hasFormChanged() {
    return this.orderForm.dirty || this.orderForm.touched
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId
      }))
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
  }
}

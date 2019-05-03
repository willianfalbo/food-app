import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemEffect', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState: string = 'ready'

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  //on click event
  emitAddEvent(){
    this.add.emit(this.menuItem)
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurant.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('300ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl
  @ViewChild('iptSearch') iptSearch: ElementRef

  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    //create an event for value changes
    this.searchControl.valueChanges
      .debounceTime(500) //delays the values emitted within this time. If a new value arrives, the previous pending value is dropped.
      .distinctUntilChanged() //ignore equal searchs after debounceTime
      // .do(searchTerm => console.log(`q=${searchTerm}`))
      .switchMap(searchTerm =>
        this.restaurantsService
          .restaurants(searchTerm)
          .catch(error => Observable.from([])))
      .subscribe(resp => this.restaurants = resp)

    this.restaurantsService.restaurants()
      .subscribe(resp => this.restaurants = resp)
  }

  toogleSearch() {
    this.searchBarState = this.searchBarState == 'hidden' ? 'visible' : 'hidden'
    this.iptSearch.nativeElement.focus()
  }

}

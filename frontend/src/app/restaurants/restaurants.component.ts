import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { from } from 'rxjs'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

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

  searchBarState = 'hidden'
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

    // create an event for value changes
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // delays the values emitted within this time. If a new value arrives, the previous pending value is dropped.
        distinctUntilChanged(), // ignore equal searchs after debounceTime
        // .tap(searchTerm => console.log(`q=${searchTerm}`))
        switchMap(searchTerm =>
          this.restaurantsService
            .restaurants(searchTerm)
            .pipe(
              catchError(error => from([]))
            )
        )
      ).subscribe(resp => this.restaurants = resp)

    this.restaurantsService.restaurants()
      .subscribe(resp => this.restaurants = resp)
  }

  toogleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
    this.iptSearch.nativeElement.focus()
  }

}

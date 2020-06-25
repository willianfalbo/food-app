import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { RestaurantsService } from 'app/restaurants/restaurant.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsService
      .restaurantReviews(this.route.parent.snapshot.params['id']) // "route.parant" needed in order to access child route
  }

}

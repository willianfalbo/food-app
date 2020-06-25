import { Routes } from '@angular/router';

import { LoggedInGuard } from './security/loggedin.guard';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register/:to', component: RegisterComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            { path: '', redirectTo: 'menu', pathMatch: 'full' },
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }
        ]
    },
    { path: 'restaurants', component: RestaurantsComponent },
    {
        path: 'order-summary',
        loadChildren: './order-summary/order-summary.module#OrderSummaryModule', // LazyLoading module
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] // to check if user is loggedin
    },
    {
        path: 'order',
        loadChildren: './order/order.module#OrderModule', // LazyLoading module
        canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] // to check if user is loggedin
    },
    { path: 'about', loadChildren: './about/about.module#AboutModule' }, // LazyLoading module
    // this one must be underneath the list
    { path: 'page-not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: '/page-not-found' },
]

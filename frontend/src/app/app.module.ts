// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { registerLocaleData } from '@angular/common';
// import localePt from '@angular/common/locales/pt' // from angular 5 "pt" is default "pt-BR"

// registerLocaleData(localePt, 'pt')

// shared configurations
import { ROUTES } from './app.routes';
import { ApplicationErrorHandler } from './app.error-handler';
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { RegisterComponent } from './security/register/register.component';
import { EmailNotTakenValidatorDirective } from './security/register/email-not-taken.directive';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent,
      RestaurantsComponent,
      RestaurantComponent,
      RestaurantDetailComponent,
      MenuComponent,
      ShoppingCartComponent,
      MenuItemComponent,
      ReviewsComponent,
      LoginComponent,
      UserDetailComponent,
      LoadingScreenComponent,
      RegisterComponent,
      EmailNotTakenValidatorDirective,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      SharedModule.forRoot(),
      RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }) // to enable routes
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt' }, // to change currency format and so on
    { provide: ErrorHandler, useClass: ApplicationErrorHandler },
    // to use "#" (hash) strategy after url domain. See https://codecraft.tv/courses/angular/routing/routing-strategies/
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

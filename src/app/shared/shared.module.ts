import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

//services
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "app/restaurants/restaurant.service";
import { OrderService } from "app/order/order.service";
import { NotificationService } from "./messages/notification.service";

//security
import { LoginService } from "app/security/login/login.service";
import { LoggedInGuard } from "app/security/loggedin.guard";
import { AuthInterceptor } from "app/security/auth.interceptor";
import { LeaveOrderGuard } from "app/order/leave-order.guard";

//components
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { SnackbarComponent } from 'app/shared/messages/snackbar/snackbar.component';

@NgModule({
    declarations: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule, // to enable "ngForms"
        ReactiveFormsModule
    ],
    exports: [
        InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent,
        //by exporting these modules below, other modules won't need to import it again when using it
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ShoppingCartService,
                RestaurantsService,
                OrderService,
                NotificationService,
                LoginService,
                LoggedInGuard,
                LeaveOrderGuard,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
            ]
        }
    }
}

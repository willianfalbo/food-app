import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
    canDeactivate(OrderComponent: OrderComponent,
                  activatedRoute: ActivatedRouteSnapshot,
                  routerState: RouterStateSnapshot): boolean {
        if (!OrderComponent.isOrderCompleted()) {
            return window.confirm('Deseja desistir da compra?')
        } else {
            return true
        }
    }
}
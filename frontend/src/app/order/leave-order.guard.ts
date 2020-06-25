import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';

export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
  canDeactivate(orderComponent: OrderComponent,
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot): boolean {
    if (!orderComponent.isOrderCompleted() && orderComponent.hasFormChanged()) {
      return window.confirm('Are you sure you want to leave this page?')
    } else {
      return true
    }
  }
}

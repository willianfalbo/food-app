import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
    private injector: Injector,
    private zone: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {

    if (errorResponse instanceof HttpErrorResponse) {

      const message = errorResponse.error.message

      // zone is needed to fix inconsistent notifications
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.ns.notify(message || 'Unauthorized.')
            break;
          case 404:
            this.ns.notify(message || 'Not found. Please check the browser console for more details.')
            break;
          default:
            this.ns.notify(message || 'An Unexpected Error Occurred.')
            break;
        }
      })

    }
    super.handleError(errorResponse)
  }

}

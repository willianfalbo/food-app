import { Injectable, Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { UserService } from '../user.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const emailPattern: RegExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

// this class was implemented based on
// https://angular.io/guide/form-validation#async-validation

// used for Reactive Forms only
@Injectable({ providedIn: 'root' })
export class EmailNotTakenValidator implements AsyncValidator {

    constructor(private userService: UserService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        if (control.dirty || control.touched) {
            const emailValid = emailPattern.test(control.value);
            if (emailValid) {
                return this.userService.userByEmail(control.value)
                    .pipe(
                        map(user => (user ? { emailTaken: true } : null)),
                        catchError(() => null)
                    );
            }
        }
    }

};

// used for Template Forms only
@Directive({
    selector: '[appEmailNotTakenValidator]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => EmailNotTakenValidator),
            multi: true
        }
    ]
})
export class EmailNotTakenValidatorDirective {
    constructor(private validator: EmailNotTakenValidator) { }

    validate(control: AbstractControl) {
        this.validator.validate(control);
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from 'app/shared/messages/notification.service';
import { UserService } from '../user.service';
import { LoginService } from '../login/login.service';
import { EmailNotTakenValidator } from './email-not-taken.directive';

@Component({
  selector: 'mt-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private emailValidator: EmailNotTakenValidator) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: this.emailValidator.validate.bind(this.emailValidator),
        updateOn: 'change'
      }),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'passwordConfirmation': new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: [RegisterComponent.equalsTo], updateOn: 'change' });
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/';
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')
    if (!password || !passwordConfirmation) {
      return undefined
    }
    if (!password.dirty || !password.touched) {
      return undefined
    }
    if (!passwordConfirmation.dirty || !passwordConfirmation.touched) {
      return undefined
    }
    if (password.value !== passwordConfirmation.value) {
      return { passwordNotMatch: true }
    }
    return undefined
  }

  register() {
    this.userService
      .register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password)
      .subscribe(user =>
        // when success
        this.notificationService.notify(`E-mail cadastrado com sucesso!`),
        // when error
        response => this.notificationService.notify(response.error.message),
        // when finished, logs the user in
        () => {
          this.loginService
            .login(this.registerForm.value.email, this.registerForm.value.password)
            .subscribe(user => { },
              // when error
              response => this.notificationService.notify(response.error.message),
              // when finished
              () => {
                this.router.navigate([this.navigateTo])
              })
        })
  }

  login() {
    this.loginService.handleLogin(this.navigateTo);
  }

  get email() { return this.registerForm.get('email'); }

  get emailErrorMessage() {
    if (this.email.errors) {
      if (this.email.errors.emailTaken) {
        return 'E-mail já existe! Tente outro e-mail';
      } else {
        return 'Obrigatório ou e-mail inválido';
      }
    }
  }

}

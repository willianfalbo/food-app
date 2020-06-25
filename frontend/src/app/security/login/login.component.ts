import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { UserService } from '../user.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/'
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user =>
        // when success
        this.notificationService.notify(`Welcome, ${user.name}!`),
        // when error
        response => this.notificationService.notify(response.error.message),
        // when finished
        () => {
          this.router.navigate([ this.navigateTo ])
        })
  }

  register() {
    this.userService.handleRegister(this.navigateTo);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { NotificationService } from 'app/shared/messages/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/') //"btoa" is optional. It's a native javascript function used to encode url and keep it friendly when routing to login page
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user =>
        //when success
        this.notificationService.notify(`Bem vindo, ${user.name}!`),
        //when error
        response => this.notificationService.notify(response.error.message),
        //when finished
        () => {
          this.router.navigate([ atob(this.navigateTo) ]) //"atob" is optional. It's a native javascript function used to decode url and keep it friendly when routing to login page
        })
  }

}

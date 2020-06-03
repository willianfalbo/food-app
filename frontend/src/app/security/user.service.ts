import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { FOODAPP_API } from 'app/app.api';
import { User } from 'app/security/login/user.model';

@Injectable()
export class UserService {

    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    register(name: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(`${FOODAPP_API}/users`, { name: name, email: email, password: password });
    }

    userByEmail(email: string): Observable<User> {
        let requestParameters: HttpParams = undefined;
        requestParameters = new HttpParams().append('email', (email ? email : ''));
        return this.http.get<User[]>(`${FOODAPP_API}/users`, { params: requestParameters })
            .pipe(
                map(users =>
                    users.find(u => u.email === email)
                )
            )
    }

    handleRegister(path: string = this.lastUrl) {
        this.router.navigate(['/register', path])
    }

}

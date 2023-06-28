import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
  
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }
  
  get currentUser(): User|undefined{
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login(): Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( user=> this.user = user),
      tap( user=> localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') )
    )
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean>|boolean{
    if( !localStorage.getItem('token')) return false;

    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError( () => of(false))
    )
  }
  
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

    constructor(private authService: AuthService,
                private router: Router) { }

    private checkStatus(): boolean | Observable<boolean>{
        return this.authService.checkAuthentication().pipe(
            tap( isAuthenticate=> {
                if( isAuthenticate ) {
                    this.router.navigate([ './' ])
                }
            }),
            map( isAuthenticate => !isAuthenticate ),
        );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.checkStatus();
    }

    canMatch(route: Route, segments: UrlSegment[]):  boolean | Observable<boolean>  {
        return this.checkStatus();
    }
    
}
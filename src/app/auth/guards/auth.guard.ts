import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{

    constructor() { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        console.log('canActivate');
        
       console.log({route, state});
       return true;
    }

    canMatch(route: Route, segments: UrlSegment[]):  boolean | Observable<boolean>  {
        console.log('canMatch');
        
        console.log({route, segments});
        return true;
    }
    
}
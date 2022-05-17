import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from '../service/util.service';
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  isOwnerLoggedIn;
  constructor(private util: UtilService,
    private router: Router, private storage: LocalStorageService){
     
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isOwnerLoggedIn = this.storage.retrieve('isOwnerLoggedIn');
    if(this.isOwnerLoggedIn){
      console.log(JSON.stringify('isOwnerLoggedIn: ' + this.isOwnerLoggedIn));
      this.storage.store('isOwnerLoggedIn', true);
    return true;
    }
    else{
      this.isOwnerLoggedIn = false;
      console.log(JSON.stringify('isOwnerLoggedIN: ' + this.isOwnerLoggedIn));
      this.storage.store('isLoggedIn', false);
      this.router.navigate(['/ad-login']);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

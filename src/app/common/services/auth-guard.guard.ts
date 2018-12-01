import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from './auth.service';
import {MessagesService} from './messages.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private message: MessagesService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.message.info('Please login to access in app.');
        this.router.navigate(['/login']);
        return false;
    }
}

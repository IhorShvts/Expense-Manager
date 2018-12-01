import {Component, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {AuthService} from '../../common/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']

})

export class AppComponent implements AfterViewChecked {
    toggle: boolean;
    userName: string;
    userAvatar: string;

    constructor(private authService: AuthService, private cdRef: ChangeDetectorRef) {
    }

    ngAfterViewChecked() {
        this.toggle = this.authService.isLoggedIn();
        if (!this.toggle) {
            this.userName = '';
            this.userAvatar = '';
        } else {
            this.userName = this.authService.currentUser.name;
            this.userAvatar = this.authService.currentUser.avatar;
        }
        this.cdRef.detectChanges();
    }

    homeToggle(toggle) {
        return toggle ? 'report' : 'login';
    }

    loginToggle(toggle) {
        return toggle ? 'logout' : 'login';
    }
}

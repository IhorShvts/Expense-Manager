import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../common/services/auth.service';
import {MessagesService} from '../../../common/services/messages.service';

@Component({
    template: ''
})

export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router,
                private message: MessagesService) {
    }

    ngOnInit() {
        this.authService.logout();
        setTimeout(() => this.message.success('You have been logged out.'));
        this.router.navigate(['login']);
    }
}

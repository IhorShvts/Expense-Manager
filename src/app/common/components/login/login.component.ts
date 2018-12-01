import {Component} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {MessagesService} from '../../services/messages.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private  messages: MessagesService) {
    }

    email = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);

    loginForm: FormGroup = this.fb.group({
        email: this.email,
        password: this.password,
    });

    loginUser(): void {
        if (this.loginForm.dirty && this.loginForm.valid) {
            this.authService.login(this.loginForm.value)
                .subscribe((data: any) => {
                console.log(data);
                    if (data.success === false) {
                        this.messages.error(data.message);
                    } else {
                        this.messages.success('Login successful.');
                        this.router.navigate(['report']);
                    }
                    this.loginForm.reset();
                });
        }
    }
}

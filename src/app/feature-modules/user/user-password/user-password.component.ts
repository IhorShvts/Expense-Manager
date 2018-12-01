import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {AuthService} from '../../../common/services/auth.service';
import {MessagesService} from '../../../common/services/messages.service';


@Component({
    selector: 'app-user-password',
    templateUrl: 'user-password.component.html',
    styleUrls: ['user-password.component.css']
})

export class PasswordComponent implements OnInit {

    pwdPattern = '^(?=.*?(?=[A-Z]|[!@#$%]))(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
    passwordForm: FormGroup;
    userObj: any;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private userService: UserService,
                private router: Router,
                private message: MessagesService) {
    }

    oldpassword = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]);
    retypepass = new FormControl('', [Validators.required]);

    ngOnInit() {
        this.userObj = this.authService.currentUser;
        this.passwordForm = this.fb.group({
            oldpassword: this.oldpassword,
            passwordGroup: this.fb.group({
                password: this.password,
                retypepass: this.retypepass,
            }, {validator: this.comparePassword})
        });
    }

    comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
        const passwordControl = c.get('password');
        const confirmControl = c.get('retypepass');

        if (passwordControl.pristine || confirmControl.pristine) {
            return null;
        }

        if (passwordControl.value === confirmControl.value) {
            return null;
        }
        return {'mismatchedPassword': true};
    }

    updatePassword(): void {
        if (this.passwordForm.dirty && this.passwordForm.valid) {
            const theForm = this.passwordForm.value;
            const thePass = this.passwordForm.value.passwordGroup.password;
            theForm.password = thePass;
            delete theForm.passwordGroup;

            this.userService.updatePassword(this.userObj.userid, theForm)
                .subscribe((data: any) => {
                    if (data.success === false) {
                        if (data.errcode) {
                            this.authService.logout();
                            this.router.navigate(['login']);
                        }
                        this.message.error(data.message);
                    } else {
                        this.message.success(data.message);
                    }
                    this.passwordForm.reset();
                });
        }
    }

    backToProfile(): void {
        this.router.navigate(['profile']);
    }

}

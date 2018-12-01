import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {MessagesService} from '../../../common/services/messages.service';


@Component({
    selector: 'app-user-register',
    templateUrl: 'user-register.component.html',
    styleUrls: ['user-register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    mobNumPattern = '^((\\+91-?)|0)?[0-9]{9,13}$';
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    pwdPattern = '^(?=.*?(?=[A-Z]|[!@#$%]))(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private router: Router,
                private message: MessagesService) {
    }

    name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]);
    phonenumber = new FormControl(null, [Validators.required, Validators.pattern(this.mobNumPattern)]);
    email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
    password = new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]);
    retypepass = new FormControl('', [Validators.required]);


    ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: this.name,
            phonenumber: this.phonenumber,
            email: this.email,
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

    registerUser(): void {
        if (this.registerForm.dirty && this.registerForm.valid) {
            const thePass = this.registerForm.value.passwordGroup.password;
            const theForm = this.registerForm.value;

            theForm.password = thePass;
            delete theForm.passwordGroup;

            this.userService.register(theForm)
                .subscribe((data: any) => {
                    console.log(data);
                    if (data.success === false) {
                        this.message.error(data.message);
                    } else {
                        this.message.success(data.message);
                        this.router.navigate(['login']);
                    }
                    this.registerForm.reset();
                });
        }
    }

    goBack(): void {
        this.router.navigate(['login']);
    }
}

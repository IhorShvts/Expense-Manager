import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {IUser} from '../user';
import {AuthService} from '../../../common/services/auth.service';
import {MessagesService} from '../../../common/services/messages.service';


@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.css']
})

export class ProfileComponent implements OnInit {
    mobNumPattern = '^((\\+91-?)|0)?[0-9]{9,13}$';
    profileForm: FormGroup;
    userObj: IUser;
    user: IUser;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private userService: UserService,
                private router: Router,
                private message: MessagesService) {
    }

    name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]);
    phonenumber = new FormControl(null, [Validators.required, Validators.pattern(this.mobNumPattern)]);
    email = new FormControl({value: '', disabled: true});
    avatar = new FormControl('', [Validators.required]);

    ngOnInit() {
        this.userObj = this.authService.currentUser;

        this.profileForm = this.fb.group({
            name: this.name,
            phonenumber: this.phonenumber,
            email: this.email,
            avatar: this.avatar
        });

        this.userService.getUser(this.userObj.userid).subscribe((data: any) => {
            if (data.success === false) {
                if (data.errcode) {
                    this.authService.logout();
                    this.router.navigate(['login']);
                }
                this.message.error(data.message);
            } else {

                this.user = data.data[0];
                this.populateForm(this.user);
            }
        });
    }

    populateForm(data): void {
        this.profileForm.patchValue({
            name: data.name,
            phonenumber: data.phonenumber,
            email: data.email,
            avatar: data.avatar
        });
    }

    updateUser(): void {
        if (this.profileForm.dirty && this.profileForm.valid) {
            this.userService.updateUser(this.userObj.userid, this.profileForm.value)
                .subscribe((data: any) => {
                    if (data.success === false) {
                        if (data.errcode) {
                            this.authService.logout();
                            this.router.navigate(['login']);
                        }
                        this.message.error(data.message);
                    } else {
                        this.message.success(data.message);
                        const theUser: {token: string, user: IUser} = JSON.parse(localStorage.getItem('currentUser'));
                        theUser.user.name = this.profileForm.value.name;
                        theUser.user.avatar = this.profileForm.value.avatar;
                        localStorage.setItem('currentUser', JSON.stringify(theUser));
                    }
                });
        }
    }

    goBack(): void {
        this.router.navigate(['report']);
    }

    goToChangePassword(): void {
        this.router.navigate(['password']);
    }
}

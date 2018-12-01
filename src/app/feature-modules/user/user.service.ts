import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {IUser} from './user';
import {HandleService} from '../../common/services/handle.service';
import {UserMessage} from '../../common/models/user-message';


@Injectable()
export class UserService {
    jwtToken: string;

    constructor(private http: HttpClient,
                private handleService: HandleService) {

        const theUser: {token: string, user: IUser} = JSON.parse(localStorage.getItem('currentUser'));
        if (theUser) {
            this.jwtToken = theUser.token;
        }
    }

    register(oUser) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        return this.http.post('http://localhost:5555/register', JSON.stringify(oUser), httpOptions).pipe(
            tap(
                (response: UserMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err))
        );
    }

    getUser(userid) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.get(`http://localhost:5555/api/user/${userid}`, httpOptions).pipe(
            tap(
                (response: UserMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err))
        );
    }

    updateUser(userid, oUser) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.put(`http://localhost:5555/api/user/${userid}`, JSON.stringify(oUser), httpOptions).pipe(
            tap(
                (response: UserMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err))
        );
    }

    updatePassword(userid, oUser) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.put(`http://localhost:5555/api/password/${userid}`, JSON.stringify(oUser), httpOptions).pipe(
            tap(
                (response: UserMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err))
        );
    }
}

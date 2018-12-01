import {IUser} from '../../feature-modules/user/user';
export interface UserMessage {
    success?: boolean;
    message?: {
        message?: IUser;
        success?: boolean;
        token?: string;
    };
    token: string;
}

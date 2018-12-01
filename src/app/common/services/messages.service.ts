import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

@Injectable()

export class MessagesService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snackBar: MatSnackBar) {
    }

    success(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['success-message']
        });
    }

    info(message: string) {
        this.snackBar.open(`Info: ${message}`, 'X', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['info-message']
        });
    }

    error(message: string) {
        this.snackBar.open(`Error: ${message}`, 'X', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['error-message']
        });
    }
}

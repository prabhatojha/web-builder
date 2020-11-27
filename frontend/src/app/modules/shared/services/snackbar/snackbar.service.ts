import { HostListener, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  closeOnClick: boolean;
  constructor(private snackbar: MatSnackBar) {
    document.addEventListener('click', () => {
      console.log('Closing');
      if (this.closeOnClick) {
        this.snackbar.dismiss();
      }
    });
  }

  open(message, duration, closeOnClick = false, horizontalPosition?, verticalPosition?) {
    this.closeOnClick = closeOnClick;
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: horizontalPosition || 'right',
      verticalPosition: verticalPosition || 'top'
    };
    this.snackbar.open(message, 'Dismiss!', config);
  }

}

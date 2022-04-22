import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  showMessage(message:string, action:string) {
    this._snackBar.open(message, action,{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:5000//5s
    });
  }
}

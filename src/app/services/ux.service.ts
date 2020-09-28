import { Component, ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { IContextMenuHandler } from './models/context-menu-handler.interface';
import { IEntityHandler } from './models/entity-handler.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UxService implements ErrorHandler,
  IContextMenuHandler,
  IEntityHandler {

  private _errors = new Subject<string>();
  errors = this._errors.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private location: Location
  ) {
  }

  handleError(error: any): void {
    const err = error instanceof Error ? error.message : error;
    this._errors.next(err);
    this.snackBar.open(this.getError(err), null, {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

  showInfo(message: string, title?: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  addToCart(message: string, title?: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  getError(err): string {
    if (environment.error[err]) {
      return environment.error[err]
    }
    return err
  }

  back() {
    this.location.back()
  }
}

@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.html',
  styles: [`
    .main-span {
      background-color: white;
    }
  `],
})
export class SnackBarComponent { }

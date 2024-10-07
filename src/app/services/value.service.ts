import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private _value = 'real value';

  constructor() { }

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  getPromiseValue() {
    return Promise.resolve('promise value');
  }

  getObservableValue() {
    return of('observable value');
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  clear(): void {
    return window.localStorage.clear();
  }

  get(id: string): any {
    const item = window.localStorage.getItem(id);
    try {
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  update(id: string, value: any): any {
    if (!value) {
      window.localStorage.removeItem(id);
    } else {
      window.localStorage.setItem(id, JSON.stringify(value));
    }
    return value;
  }

  remove(id: string) {
    window.localStorage.removeItem(id);
  }
}

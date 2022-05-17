import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  isLoggedIn: any;

  constructor() { 
    this.isLoggedIn = false;
  }
}

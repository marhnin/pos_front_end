import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctService {

  public ipaddress: any;

  constructor() {  
    
    this.ipaddress = "http://localhost:3000/"; 

  }
}

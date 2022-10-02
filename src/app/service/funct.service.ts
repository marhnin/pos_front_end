import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctService {

  public ipaddress: any;

  constructor() {  
    //this.ipaddress = "http://localhost:3000/"; 
    
     this.ipaddress = "https://pos-123.herokuapp.com:3000/";
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctService {

  public ipaddress: any;

  constructor() {  
    //.Net api
   this.ipaddress = "http://localhost:22735/api/"; 
    
   // this.ipaddress = "http://192.168.100.15:8080/api/"; 
  
    //this.ipaddress = "http://192.168.100.15:45456/api/";

     //prod
    // this.ipaddress  = "https://apinew.thai2d3d.com/api/";

    //dev
    //this.ipaddress = "https://api.thai2d3d.com/api/";

    //this.ipaddress = "https://api.thai2d3dgame.com/api/";

    //old app
    //this.ipaddress = "https://178.128.57.191:8080/thai2D3D/api/"; 

  }
}

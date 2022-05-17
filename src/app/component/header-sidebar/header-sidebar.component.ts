import { Component, OnInit } from '@angular/core';

import { DtoService } from '../../service/dto.service';
import { UtilService } from '../../service/util.service';
import { FunctService } from '../../service/funct.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.css']
})
export class HeaderSidebarComponent implements OnInit {
  constructor( private dto: DtoService, private storage: LocalStorageService, private util: UtilService, 
    private funct: FunctService) 
    { }

  ngOnInit(): void {
  }

  logOut()
  {
            this.util.isLoggedIn = false;
            this.dto.token = ""; 
            this.storage.store('token', this.dto.token);
            this.storage.store('isOwnerLoggedIn', this.util.isLoggedIn);
            window.location.href = "/ad-login";
  }
}

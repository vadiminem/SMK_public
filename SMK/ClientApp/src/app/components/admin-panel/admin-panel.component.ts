import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  isAuthorized() {
    return localStorage.getItem('token');
  }

  logOut() {
    this.userService.logOut();
  }

}

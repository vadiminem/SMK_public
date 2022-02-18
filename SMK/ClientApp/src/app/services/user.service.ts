import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUrl + 'ApplicationUser';
  //private readonly baseUrl = 'http://localhost:64329/api/ApplicationUser'
  constructor(private http: HttpClient, private router: Router) { }

  login(formData) {
    return this.http.post(this.baseUrl + '/Login', formData);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

}

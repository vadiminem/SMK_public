import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent {

  formModel = {
    UserName: '',
    Password: ''
  }

  constructor(private authService: UserService, private router: Router) {
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('');
      },
      err => {
        if (err.status == 400)
          console.log('Incorrect username or password.', 'Authentication failed.');
      }
    );
  }

}

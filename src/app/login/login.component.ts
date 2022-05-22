import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    user:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern('((?=.*[¨!"#$%&/(=)?*¸¨˝´˙`˛°˘^ˇ~\|€łŁß{@§}])(?=.*[a-z])(?=.*[A-Z]).{6,})')]),
  });

  loginUser(){
    this.auth.login().then(() => {
      this.router.navigate(['orders']);
    })
  }

  get user()
  {
    return this.loginForm.get('user')
  }

  get password()
  {
    return this.loginForm.get('password')
  }
}

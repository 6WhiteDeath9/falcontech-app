import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    user:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern('((?=.*[¨!"#$%&/(=)?*¸¨˝´˙`˛°˘^ˇ~\|€łŁß{@§}])(?=.*[a-z])(?=.*[A-Z]).{6,})')]),
  });

  loginUser(){
    console.warn(this.loginForm.value)
    this.router.navigate(['orders'])
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

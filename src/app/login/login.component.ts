import { HttpClientModule } from '@angular/common/http';
import { UserlogService } from './../userlog.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private user:UserlogService) { }

  ngOnInit() {
  }

  check(e){
    e.preventDefault();
    var user=e.target.elements[0].value;
    var pwd=e.target.elements[1].value;
    //console.log(user);

    this.user.getUserDetails(user,pwd).subscribe(data => {
      if(data.trim()=="true"){
        console.log("Welcome")

        this.user.setstatus();
        this.router.navigate(['dashboard']);

      }
      else{
        window.alert("Invalid")
        
      }
    })

    // if(user=='admin'&&pwd=='admin'){
    //   this.user.setstatus();
    //   this.router.navigate(['dashboard'])
    // }
    // else{
    //   console.log('invalid user')
    // }
  }
}

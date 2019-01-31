import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../student';

import { UserlogService } from '../userlog.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {

  students: Student[];
  a:Student[];
  stucpy:Student[];

  test:string;
  
  // sname:String[];
  // smarks:Number[];

  // s:Student={
  //   name:'test1234',
  //   marks:4
  // }


  constructor(private studentservice:StudentService,private user:UserlogService, public studentService: StudentService,private router:Router, private user1:UserlogService) {
    
   }

  ngOnInit() {
    this.studentservice.currentstudentdetail.subscribe(students => this.students = students)    
  }

  onClick(top:number){

    this.stucpy=this.students;

    if(top<1||top>this.stucpy.length){
      alert("Give a valid input");
      return false;
    }

    //console.table(this.students.slice(0,top))
    //console.log(this.students[0])

    let i,j:number=0;

     for(i=0;i<top;i++){
      for(j=i+1;j<this.stucpy.length;j++){
        //console.log(i+','+j)
        if(this.stucpy[i]['marks']==this.stucpy[j]['marks']){
          top++;i++;
        }        
      }

     }
    //   if(this.stucpy[i]['marks']==this.stucpy[i+1]['marks']){
    //     j=j+1;
    //   }
    // }

    //console.log(this.stucpy.length)

    //console.log(j);

    this.a=this.students.slice(0,top);
    //console.table(this.a);

    //console.log(this.stucpy);

    // for(let s of this.students){
    //   //console.log(Array.isArray(s));
    //   console.log(this.a[name].toString());
    //}

    //console.log(this.a[0].marks);
    // for(let item of this.a){
    //   console.log(item[0].name);
    // }

    // console.log(this.s.name);

    //console.log(this.sname[0]);

    //console.log((this.a[0]['marks']));

    this.user.userval().subscribe(dat => {
      console.log(dat);
    })
    

  }


}

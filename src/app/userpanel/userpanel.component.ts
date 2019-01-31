import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { UserlogService } from '../userlog.service';

import {Student} from '../student';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

  students: Student[];
  error = '';
  success = '';

  student = new Student('', 0);

  constructor(private user:UserlogService, public studentService: StudentService,private router:Router, private user1:UserlogService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAll().subscribe(
      (res: Student[]) => {
        this.students = res;
        //console.table(this.students)
        this.studentService.updatestudentdetail(this.students)
      },
      (err) => {
        this.error=err;
      }
    );
  }

  addStudent(f) {
    this.resetErrors();

    this.studentService.store(this.student)
      .subscribe(
        (res: Student[]) => {
          // Update the list of cars
          this.students = res;

          // console.table(this.students)

          // this.students.sort(function(a,b){
          //   return this.a.marks-this.b.marks;
          // })
          this.getStudents();
          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }  

  updateStudent(name, marks, id) {
    this.resetErrors();

    this.studentService.update({ name: name.value, marks: marks.value, id: +id })
      .subscribe(
        (res) => {
          this.students = res;
          this.getStudents();
          this.success = 'Updated successfully';
        },
        (err) => this.error = err
      );
  }

  deleteStudent(id) {
    this.resetErrors();

    this.studentService.delete(+id)
      .subscribe(
        (res: Student[]) => {
          this.students = res;
          this.getStudents();
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }

}

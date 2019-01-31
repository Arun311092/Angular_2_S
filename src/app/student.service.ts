import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = 'http://localhost/stu';
  students: Student[];
  
  constructor(private http: HttpClient) { }

  // x(){
  //   console.log('asdf')
  // }

  getAll(): Observable<Student[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.students = res['data'];
        return this.students;
    }),
    catchError(this.handleError));
  }  

  store(student: Student): Observable<Student[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: student })
      .pipe(map((res) => {
        this.students.push(res['data']);
        return this.students;
      }),
      catchError(this.handleError));
  }  

  update(student: Student): Observable<Student[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: student })
      .pipe(map((res) => {
        const theCar = this.students.find((item) => {
          return +item['id'] === +student['id'];
        });
        if (theCar) {
          theCar['marks'] = +student['marks'];
          theCar['name'] = student['name'];
        }
        return this.students;
      }),
      catchError(this.handleError));
  }  

  delete(id: number): Observable<Student[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map(res => {
        const filteredCars = this.students.filter((student) => {
          return +student['id'] !== +id;
        });
        return this.students = filteredCars;
      }),
      catchError(this.handleError));
  }  

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  private studentdetail = new BehaviorSubject<Student[]>([]);
  currentstudentdetail = this.studentdetail.asObservable();

  updatestudentdetail(stu:Student[]){
    this.studentdetail.next(stu);
  }

}


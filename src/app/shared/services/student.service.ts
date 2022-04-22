import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  /*
    La liste des apprenants
    method : GET
    endpoint : '/customers'
  */
  getStudentsFromApi():Observable<StudentModel[]> {
    return this.http.get(environment.apiStudentUrl+'/customers')
    .pipe(
      map( (apiResponse:any) =>
        apiResponse.map( (student:any) => new StudentModel( student) )
    ))
  }

  addStudentsFromApi(student:any):Observable<any> {
    return this.http.post(environment.apiStudentUrl+'/customers',student);
  }

}

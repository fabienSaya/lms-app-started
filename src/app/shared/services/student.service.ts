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

   /*
    Poster un nouvel apprenant
    method : POST
    endpoint : '/customers'
  */
    createNewStudentInApi(newStudent:any):Observable<any> {
      //return this.http.post(environment.apiStudentUrl+'/customers', newStudent);

      //test où je génère une 404 volontairement en mettant mauvais endpoint. Normalement c'est customers
      return this.http.post(environment.apiStudentUrl+'/cus', newStudent);
    }


  /*
    Update un nouvel apprenant
    method : PUT
    endpoint : '/customers'
  */
  updateStudentInApi(student:StudentModel):Observable<any> {
    return this.http.put(environment.apiStudentUrl+'/customers/'+student.id, student);
  }

  deleteStudentInApi(student:StudentModel):Observable<any> {
    return this.http.delete(environment.apiStudentUrl+'/customers/'+student.id);
  }

}

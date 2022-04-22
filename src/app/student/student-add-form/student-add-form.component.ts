import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {

  studentForm:FormGroup;

  constructor() {
    this.studentForm = new FormGroup({
      first: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      last: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      city: new FormControl(''),
      mobile: new FormControl(''),
      situation: new FormControl('',Validators.required)

      });
  }

  ngOnInit(): void {
  }

  onSubmit(event:Event) {
    //évite de recharger la parge au moment de la soumission
    //sinon, l'event normal de soumission est de faire l'action et recharger la page
    event.preventDefault();

    console.log("submit");
  }

}

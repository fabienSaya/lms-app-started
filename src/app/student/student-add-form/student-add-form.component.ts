import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {

  studentForm:FormGroup;


  constructor(private fb:FormBuilder,
    private studentSvc:StudentService,
    private alerteSvc: AlertService,
    private router: Router
    ) {
    /*this.studentForm = new FormGroup({
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
      */
      this.studentForm = this.fb.group({
        first: ['', [Validators.required,Validators.minLength(2)]],
        last: ['', [Validators.required,Validators.minLength(2)]],
        email: ['', [Validators.required,Validators.email]],
        city: [''],
        mobile: [''],
        situation: ['',Validators.required]
      })

  }

  ngOnInit(): void {
    this.studentForm.controls['first'].setValue('fabien');
    this.studentForm.controls['last'].setValue('saya');
    this.studentForm.controls['email'].setValue('fabien@hotmail.com');
    this.studentForm.controls['city'].setValue('paris');
    this.studentForm.controls['mobile'].setValue('06060606');
    this.studentForm.controls['situation'].setValue('2');
  }



  onSubmit(event:Event) {
    //évite de recharger la parge au moment de la soumission
    //sinon, l'event normal de soumission est de faire l'action et recharger la page
    event.preventDefault();

    console.log("onSubmit");
    console.log(this.studentForm.value);
//    console.log(this.studentForm);

    if (this.studentForm.valid) {
      console.log('formulaire valide')
      let newStudent=this.studentForm.value;
      //nouvelle écriture du subscribe.
      this.studentSvc.createNewStudentInApi(newStudent).subscribe(
          {
              next  : response => {
                        //console.log(response)//si tout s'est bien passé
                        this.alerteSvc.showMessage('vous avez bien ajouté un nouvel apprenant','Fermer');
                        this.router.navigate(['/students']);
                      }
              //si on a une erreur sur l'appel maintenant on passe par l'intercepteur donc ca sert à rien
              /*,error : err => {
                console.error(err);
                if (err.status==404) {
                  alert("La ressource n'existe pas");
                }

              }*/

          }
        )
      //console.log(response);
    } else {
      console.log('formulaire invalide')
    }
  }

}

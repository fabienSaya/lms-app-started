import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

import { CourseComponent } from './course/course.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentAddFormComponent } from './student/student-add-form/student-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';

import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    StudentListComponent,
    StudentAddFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    /* import pour formulaire */
    ReactiveFormsModule,

    MatSnackBarModule,
    MatProgressBarModule,

    /* MATERIAL ANGULAR MODULES */
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [
    /*l'ordre des intercepteur est important. On mettrait dans l'ordre:
      1er : LoaderInterceptor (le next envoie vers le second intercepteur) -> c'est ce qui sert a afficher les fenetre d'attente/pour patienter quand on envoie une requete à qqn
      2eme: TokenInterceptor
      3eme: ErrorsInterceptor (il gère les erreurs de réponse)
      */

      {
        provide : HTTP_INTERCEPTORS,
        useClass : LoaderInterceptor,
        multi:true
      },
      {
        provide : HTTP_INTERCEPTORS,
        useClass : ErrorsInterceptor,
        multi:true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

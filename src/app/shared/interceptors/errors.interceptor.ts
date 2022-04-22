import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private router: Router, private alertSvc:AlertService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
        tap({//tap permet de traiter quelquechose sans y toucher. C'est une sorte de consumer
          error: (err) => {
              if (err instanceof HttpErrorResponse) {
                  console.log('error est interceptée', err.status);
                  switch (err.status) {
                    case 401: //faudrait plutot alert en material ou une snackbar
                      //alert("Vous n'etes pas connecté");
                      this.alertSvc.showMessage('Vous n\'etes pas connecté','Fermer');
                      //on devrait router dans ce cas vers la page de login (ca utilise le fichier de routing)
                      //this.router.navigate(['login']);
                      break;
                    case 403:
                      //alert("Vous n'etes pas autorisé");
                      this.alertSvc.showMessage('Vous n\'etes pas autorisé','Fermer');
                      break;

                    case 404:
                      //alert("la ressource n'existe pas");
                      this.alertSvc.showMessage('la ressource n\'existe pas','Fermer');
                      break;

                    case 500:
                      //alert("Erreur serveur");
                      this.alertSvc.showMessage('Erreur serveur','Fermer');
                      break;
                  }
              }
            }
        })
    )
  }

}

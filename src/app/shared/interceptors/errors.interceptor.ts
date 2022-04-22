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

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

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
                    case 401: //faudrait plutot alert en material mais là on a pas le tps
                      alert("Vous n'etes pas connecté");
                      //on devrait router dans ce cas vers la page de login (ca utilise le fichier de routing)
                      //this.router.navigate(['login']);
                      break;
                    case 403:
                      alert("Vous n'etes pas autorisé");
                      break;

                    case 404:
                      alert("la ressource n'existe pas");
                      break;

                    case 500:
                      alert("Erreur serveur");
                      break;
                  }
              }
            }
        })
    )
  }

}

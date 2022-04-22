import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderSvc:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //la request arrive donc on indique qu'on démarre un load (ie une requete)
    this.loaderSvc.setLoader(true);

    return next.handle(request).pipe(
      finalize(()=> this.loaderSvc.setLoader(false)) //on met à faux une fois que la requete est terminée
    );
  }
}

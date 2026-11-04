import {
    HttpContextToken,
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpInterceptor,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private loadingService = inject(LoadingService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.loadingOn();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.loadingOff();
            }),
        );
    }
}

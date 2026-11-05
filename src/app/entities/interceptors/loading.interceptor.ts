import {
    HttpContextToken,
    type HttpEvent,
    type HttpHandler,
    type HttpRequest,
    type HttpInterceptor,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { finalize, type Observable } from 'rxjs';
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

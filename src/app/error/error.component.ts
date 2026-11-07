import { HttpErrorResponse } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
    imports: [LoadingIndicatorComponent, RouterLink],
})
export class ErrorComponent {
    public readonly error = input<HttpErrorResponse>(
        new HttpErrorResponse({
            status: 404,
            error: { error: 'Page not be found.' },
        }),
    );
}

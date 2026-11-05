import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../entities/services/loading.service';

@Component({
    selector: 'loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.scss',
    imports: [MatProgressSpinnerModule, AsyncPipe, CommonModule],
})
export class LoadingIndicatorComponent {
    private readonly loadingService = inject(LoadingService);

    protected readonly loading$: Observable<boolean> = this.loadingService.loading$;
}

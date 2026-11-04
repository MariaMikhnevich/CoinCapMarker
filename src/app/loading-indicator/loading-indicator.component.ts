import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../entities/services/loading.service';

@Component({
    selector: 'loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.scss'],
    imports: [MatProgressSpinnerModule, AsyncPipe, CommonModule],
})
export class LoadingIndicatorComponent {
    loadingService = inject(LoadingService);

    loading$: Observable<boolean>;

    @Input()
    detectRouteTransitions = false;

    constructor() {
        this.loading$ = this.loadingService.loading$;
    }
}

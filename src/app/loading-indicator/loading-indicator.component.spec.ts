import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { LoadingService } from '../entities/services/loading.service';
import { LoadingIndicatorComponent } from './loading-indicator.component';

describe('LoadingIndicatorComponent', () => {
    let fixture: ComponentFixture<LoadingIndicatorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LoadingIndicatorComponent],
        });
        fixture = TestBed.createComponent(LoadingIndicatorComponent);
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('shows the spinner only while a request is loading', () => {
        const loading = TestBed.inject(LoadingService);
        expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeNull();

        loading.loadingOn();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();

        loading.loadingOff();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeNull();
    });
});

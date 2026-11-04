import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorComponent],
            imports: [LoadingIndicatorComponent],
        });
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

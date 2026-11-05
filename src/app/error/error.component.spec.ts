import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LoadingIndicatorComponent, ErrorComponent],
        });
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { HttpErrorResponse } from '@angular/common/http';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ErrorComponent],
            providers: [provideRouter([])],
        });
        fixture = TestBed.createComponent(ErrorComponent);
        fixture.componentRef.setInput(
            'error',
            new HttpErrorResponse({
                status: 404,
                error: { error: 'Page not be found.' },
            }),
        );
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('renders the HTTP status code', () => {
        expect(fixture.nativeElement.querySelector('.status')?.textContent?.trim()).toBe('404');
    });

    it('renders the API error message', () => {
        expect(fixture.nativeElement.querySelector('.error-message')?.textContent?.trim()).toBe(
            'Page not be found.',
        );
    });

    it('links back to the main page', () => {
        const link: HTMLAnchorElement = fixture.nativeElement.querySelector('a.go-back');
        expect(link.getAttribute('href')).toBe('/');
        expect(link.textContent?.trim()).toBe('Back to main page');
    });
});

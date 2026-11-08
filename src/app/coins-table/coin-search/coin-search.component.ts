import { Component, DestroyRef, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'coin-search',
    templateUrl: './coin-search.component.html',
    styleUrl: './coin-search.component.scss',
    imports: [ReactiveFormsModule],
})
export class CoinSearchComponent {
    public readonly searchChanged = output<string>();

    protected readonly searchControl = new FormControl('', { nonNullable: true });

    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        this.searchControl.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => this.searchChanged.emit(value));
    }
}

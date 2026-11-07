import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { Coin } from '../entities/classes/coin.class';
import { ModalAddCoinInBriefcaseComponent } from './modal-add-coin-in-briefcase/modal-add-coin-in-briefcase.component';
import { ModalBriefcaseComponent } from './modal-briefcase/modal-briefcase.component';

@Component({
    selector: 'modal-windows',
    templateUrl: './modal-windows.component.html',
    styleUrl: './modal-windows.component.scss',
    imports: [ModalAddCoinInBriefcaseComponent, ModalBriefcaseComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowsComponent {
    public readonly isVisible = input<boolean>(false);
    public readonly coin = input<Coin | null>(null);
    public readonly isBriefcase = input<boolean>(false);

    public readonly closed = output<boolean>();

    protected readonly title = computed<string>(() => {
        if (this.isBriefcase()) return 'Your Briefcase';
        if (this.coin()) return 'Add Coin';
        return '';
    });

    protected close() {
        this.closed.emit(false);
    }

    protected interception(event: Event) {
        event.stopPropagation();
    }
}

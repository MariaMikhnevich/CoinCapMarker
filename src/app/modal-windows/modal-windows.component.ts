import {
    ChangeDetectionStrategy,
    Component,
    input,
    type OnChanges,
    output,
    type SimpleChanges,
} from '@angular/core';
import type { CoinInBriefcase } from '../entities/classes/coin-in-briefcase.class';
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
export class ModalWindowsComponent implements OnChanges {
    public readonly isVisible = input<boolean>(false);
    public readonly coin = input<Coin | null>(null);
    public readonly briefcase = input<CoinInBriefcase[] | null>(null);

    public readonly closed = output<boolean>();

    protected title: string = '';

    protected close() {
        this.closed.emit(false);
    }

    protected interception(event: Event) {
        event.stopPropagation();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['coin']) {
            this.title = 'Add Coin';
        } else if (changes['briefcase']) {
            this.title = 'Your Briefcase';
        } else {
            this.title = '';
        }
    }
}

import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { CoinsInBriefcaseService } from '../../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../../entities/services/coins.service';
import { ModalBriefcaseComponent } from './modal-briefcase.component';

describe('ModalBriefcaseComponent', () => {
    let component: ModalBriefcaseComponent;
    let fixture: ComponentFixture<ModalBriefcaseComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalBriefcaseComponent],
            providers: [
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets: () => of([]) } },
                CoinsService,
                CoinsInBriefcaseService,
            ],
        });
        fixture = TestBed.createComponent(ModalBriefcaseComponent);
        fixture.componentRef.setInput('briefcase', []);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });
});

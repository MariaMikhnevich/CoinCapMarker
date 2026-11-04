import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { COINS_DATA_PROVIDER } from '../core/data-provider/data-provider.token';
import { Coin } from '../entities/classes/coin.class';
import { CoinsService } from '../entities/services/coins.service';
import { CoinsTableComponent } from './coins-table.component';

describe('CoinsTableComponent', () => {
    let component: CoinsTableComponent;
    let fixture: ComponentFixture<CoinsTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CoinsTableComponent],
            imports: [RouterTestingModule, NgxPaginationModule],
            providers: [
                {
                    provide: COINS_DATA_PROVIDER,
                    useValue: {
                        getAssets: () => of([]),
                        getAsset: () => of({} as Coin),
                        getHistory: () => of([]),
                    },
                },
                CoinsService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(CoinsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

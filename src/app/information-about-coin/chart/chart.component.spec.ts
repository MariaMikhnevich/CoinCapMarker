import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { ChartService } from '../../entities/services/chart.service';
import { VisualChartsService } from '../../entities/services/visual-charts.service';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ChartComponent],
            imports: [LoadingIndicatorComponent],
            providers: [
                {
                    provide: COINS_DATA_PROVIDER,
                    useValue: {
                        getAssets: () => of([]),
                        getAsset: () => of({} as never),
                        getHistory: () => of([]),
                    },
                },
                ChartService,
                VisualChartsService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

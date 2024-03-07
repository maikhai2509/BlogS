import { Component, OnDestroy, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { SpinnerService } from "src/app/_service/spinner.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

    $unsubscribe: Subscription;
    isLoading: boolean = false;

    constructor(
        private loadingService: SpinnerService,
        private cdr: ChangeDetectorRef,
    ){}

    ngOnInit(): void {
        this.$unsubscribe = this.loadingService.$loading.subscribe(isLoading => {
            this.isLoading = isLoading;
            this.cdr.detectChanges();
        })
    }

    ngOnDestroy(): void {
        if (this.$unsubscribe) {
            this.$unsubscribe.unsubscribe();
        }
    }
}

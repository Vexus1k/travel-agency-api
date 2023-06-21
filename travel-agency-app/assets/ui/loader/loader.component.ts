import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from "../../../app/core/services/LoadingService";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
    protected readonly Array = Array;

    constructor(
      public readonly loadingService: LoadingService
    ) {}
}

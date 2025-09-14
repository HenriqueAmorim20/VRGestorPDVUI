import { Component, input } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  selector: 'vr-loading-container',
  imports: [NzSpinModule],
  templateUrl: './loading-container.component.html',
  styleUrl: './loading-container.component.scss',
})
export class LoadingContainerComponent {
  isLoading = input.required<boolean>();
}

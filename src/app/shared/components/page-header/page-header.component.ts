import { Component, input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate/translate.pipe';

@Component({
  selector: 'vr-page-header',
  imports: [TranslatePipe],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  title = input.required<string>();
}

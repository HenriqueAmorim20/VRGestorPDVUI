import { NgModule, Type } from '@angular/core';
import { DispatcherPipe } from './dispatcher.pipe';
import { DatePipe } from '../date/date.pipe';
import { CurrencyPipe } from '../currency/currency.pipe';
import { FormatIdPipe } from '../format-id/format-id.pipe';
import { BooleanPipe } from '../boolean/boolean.pipe';
import { TranslatePipe } from '../translate/translate.pipe';
import { ExtractObjectPropPipe } from '../extract-object-prop/extract-object-prop.pipe';
import { EnumLabelPipe } from '../enum-label/enum-label.pipe';
export type DispatcherPipeOptions = Type<
  | DatePipe
  | CurrencyPipe
  | FormatIdPipe
  | BooleanPipe
  | TranslatePipe
  | FormatIdPipe
  | ExtractObjectPropPipe
  | EnumLabelPipe
>;

@NgModule({
  imports: [DispatcherPipe],
  exports: [DispatcherPipe],
  providers: [
    DatePipe,
    CurrencyPipe,
    FormatIdPipe,
    BooleanPipe,
    FormatIdPipe,
    TranslatePipe,
    ExtractObjectPropPipe,
    EnumLabelPipe,
  ],
})
export class DispatcherPipeModule {}

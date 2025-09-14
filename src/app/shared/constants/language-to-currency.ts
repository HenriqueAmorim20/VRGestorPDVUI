import { Currency } from '../enums/currency.enum';
import { Language } from '../enums/language.enum';

export const LANGUAGE_TO_CURRENCY = {
  [Language.PT_BR]: Currency.BRL,
  [Language.EN_US]: Currency.USD,
};

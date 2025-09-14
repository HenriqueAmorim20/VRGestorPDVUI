import { inject, Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../constants/storage-keys';
import ptBrTranslations from '../../../../translations/pt-br.json';
import enUsTranslations from '../../../../translations/en-us.json';
import { ValueToReplace } from '../../pipes/translate/interfaces/value-to-replace.interface';
import { Language } from '../../enums/language.enum';
import { en_US, NzI18nInterface, NzI18nService, pt_BR } from 'ng-zorro-antd/i18n';

export const TRANSLATION: Record<Language, Record<string, any>> = {
  [Language.PT_BR]: ptBrTranslations,
  [Language.EN_US]: enUsTranslations,
};

export const I18N_LOCALE: Record<Language, NzI18nInterface> = {
  [Language.PT_BR]: pt_BR,
  [Language.EN_US]: en_US,
};

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  #translation!: Record<string, any>;
  #selectedLanguage: Language = Language.PT_BR;
  #i18nService = inject(NzI18nService);

  constructor() {
    this.initTranslation();
  }

  private initTranslation() {
    const selectedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);

    if (selectedLanguage && Object.values(Language).includes(selectedLanguage as Language)) {
      this.#selectedLanguage = selectedLanguage as Language;
    }

    this.#i18nService.setLocale(I18N_LOCALE[this.#selectedLanguage]);
    this.#translation = TRANSLATION[this.#selectedLanguage];
  }

  getTranslation(key: string, valuesToReplace: ValueToReplace[] = []): string {
    let result: unknown = key;

    try {
      const objPath = key.split('.');
      let translation = this.#translation;

      for (const path of objPath) {
        translation = translation[path.toLowerCase()];
      }

      result = translation ?? key;
    } catch {
      // console.warn(`Translation not found for key: ${key}`);
    }

    if (valuesToReplace.length > 0) {
      result = this.replaceValues(String(result), valuesToReplace);
    }

    return result as string;
  }

  private replaceValues(result: string, valuesToReplace: ValueToReplace[]): string {
    for (const value of valuesToReplace) {
      result = result.replace(`{{${value.key}}}`, value.value);
    }

    return result;
  }

  setLanguage(language: Language) {
    this.#selectedLanguage = language;
    this.#i18nService.setLocale(I18N_LOCALE[language]);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    this.#translation = TRANSLATION[this.#selectedLanguage];
  }

  getSelectedLanguage(): Language {
    return this.#selectedLanguage;
  }
}

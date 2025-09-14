import { TranslateService } from '../../services/translate/translate.service';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  const translateService = new TranslateService();

  it('create an instance', () => {
    const pipe = new TranslatePipe(translateService);
    expect(pipe).toBeTruthy();
  });
});

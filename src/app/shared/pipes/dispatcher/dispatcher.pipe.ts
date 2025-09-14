import { inject, Injector, Pipe, PipeTransform } from '@angular/core';
import { DispatcherPipeOptions } from './dispatcher.pipe.module';

export interface DispatcherConfig {
  pipe: DispatcherPipeOptions & { name: string };
  pipeArgs?: any[];
}

@Pipe({
  name: 'dispatcher',
  pure: false,
})
export class DispatcherPipe implements PipeTransform {
  #injector = inject(Injector);

  transform(value: unknown, config?: DispatcherConfig): unknown {
    if (!config || !config.pipe) {
      return value;
    }

    try {
      const pipeInstance = this.#injector.get(config.pipe);
      const pipeArgs = config.pipeArgs || [];

      return pipeInstance.transform(value, ...pipeArgs);
    } catch (error) {
      console.error(`DispatcherPipe: Error resolving or transforming with pipe ${config.pipe.name}.`, error);
      return value;
    }
  }
}

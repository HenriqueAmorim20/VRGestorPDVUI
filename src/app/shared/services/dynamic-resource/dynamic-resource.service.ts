import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseMessage } from '../../interfaces/response-message.interface';
import { FindAllParams } from '../../interfaces/find-all-params.interface';
import { LabelValue } from '../../interfaces/label-value.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class DynamicResourceService<T = unknown, C = T, U = Partial<T>> {
  http = inject(HttpClient);
  url!: string;

  initUrl(resourcePath: string): void {
    const baseUrlClean = environment.apiUrl.replace(/\/+$/, '');
    const resourcePathClean = resourcePath.replace(/^\/+/, '');
    this.url = resourcePathClean ? `${baseUrlClean}/${resourcePathClean}/` : baseUrlClean;
  }

  get<P extends Record<string, unknown>>(findAllParams: FindAllParams<P>): Observable<ResponseMessage<T[]>> {
    const params = {
      ...findAllParams,
      filter: JSON.stringify(findAllParams.filter),
      sort: JSON.stringify(findAllParams.sort),
    };

    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ResponseMessage<T[]>>(this.url, { params: queryParams, withCredentials: true });
  }

  post(body: C): Observable<ResponseMessage<T>> {
    return this.http.post<ResponseMessage<T>>(this.url, body, { withCredentials: true });
  }

  getById(id: number | string): Observable<ResponseMessage<T>> {
    return this.http.get<ResponseMessage<T>>(this.url + id, { withCredentials: true });
  }

  patch(id: number | string, body: U): Observable<ResponseMessage<T>> {
    return this.http.patch<ResponseMessage<T>>(this.url + id, body, { withCredentials: true });
  }

  delete(id: number | string): Observable<ResponseMessage<T>> {
    return this.http.delete<ResponseMessage<T>>(this.url + id, { withCredentials: true });
  }

  select(filter: string): Observable<LabelValue[]> {
    return this.http
      .get<ResponseMessage<LabelValue[]>>(this.url + 'select', { params: { filter }, withCredentials: true })
      .pipe(map((response) => response.data));
  }
}

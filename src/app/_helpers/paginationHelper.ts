import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../users/interfaces/IPagination';

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  // al usar la opcion observe:'response', angular retonrna toda la respuesta (full)
  // no extrae solo el body como lo hace por default, asi podremos ver los headers
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((res) => {
      const response = res.body;
      if (response) {
        paginatedResult.result = response;
      }
      const pagination = res.headers.get('Pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());
  return params;
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { CustomerDtoPagedResultDto } from '../models/northwind-swagger/customer-dto-paged-result-dto';
import { OrderDto } from '../models/northwind-swagger/order-dto';
import { ProductDto } from '../models/northwind-swagger/product-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthwindSwaggerService {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomerDtoList(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto[]>('getCustomerDtoList', [])));
  }

  public getCustomerDtoPagedResultDto(pageIndex: number, size: number, orderBy: string): Observable<CustomerDtoPagedResultDto | undefined> {
    const params = new HttpParams()
      .append('pageIndex', pageIndex)
      .append('size', size)
      .append('orderBy', orderBy);
    const options = {
      params,
    };
    return this.http.get<CustomerDtoPagedResultDto | undefined>(`${API_ENDPOINT}/Customers/GetCustomersWithPage`, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDtoPagedResultDto | undefined>('getCustomerDtoPagedResultDto', undefined)));
  }

  public putCustomerDto(id: string, data?: CustomerDto): Observable<CustomerDto | undefined> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    const body = data ?? {
      customerId: 'string',
      companyName: 'string',
      contactName: 'string',
      contactTitle: 'string',
      address: {
        street: 'string',
        city: 'string',
        region: 'string',
        postalCode: 'string',
        country: 'string',
        phone: 'string'
      }
    };
    return this.http.put<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('putCustomerDto', undefined)));
  }

  public postCustomerDto(data?: CustomerDto): Observable<CustomerDto | undefined> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    const body = data ?? {
      customerId: 'string',
      companyName: 'string',
      contactName: 'string',
      contactTitle: 'string',
      address: {
        street: 'string',
        city: 'string',
        region: 'string',
        postalCode: 'string',
        country: 'string',
        phone: 'string'
      }
    };
    return this.http.post<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('postCustomerDto', undefined)));
  }

  public deleteCustomerDto(id: string): Observable<CustomerDto | undefined> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    return this.http.delete<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('deleteCustomerDto', undefined)));
  }

  public getCustomerDto(id: string): Observable<CustomerDto | undefined> {
    return this.http.get<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('getCustomerDto', undefined)));
  }

  public getOrderDtoList(id: string): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`)
      .pipe(catchError(ErrorHandlerService.handleError<OrderDto[]>('getOrderDtoList', [])));
  }

  public getProductDtoList(id: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${API_ENDPOINT}/Orders/${id}/Products`)
      .pipe(catchError(ErrorHandlerService.handleError<ProductDto[]>('getProductDtoList', [])));
  }
}

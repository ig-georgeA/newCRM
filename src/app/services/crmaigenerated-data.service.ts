import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { SupportTicketsType } from '../models/crmaigenerated-data/support-tickets-type';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CRMAIGeneratedDataService {
  constructor(
    private http: HttpClient
  ) { }

  public getSupportTicketsList(): Observable<SupportTicketsType[]> {
    return this.http.get<SupportTicketsType[]>("https://excel2json.io/api/share/c7df4f41-57a9-4926-2fa0-08dda2c45f95")
      .pipe(catchError(ErrorHandlerService.handleError<SupportTicketsType[]>('getSupportTicketsList', [])));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGridEditDoneEventArgs, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_GRID_DIRECTIVES, IRowDataEventArgs } from '@infragistics/igniteui-angular';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-child-view',
  imports: [IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_GRID_DIRECTIVES],
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.scss']
})
export class ChildViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public northwindSwaggerCustomerDto: CustomerDto[] = [];

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerCustomerDto = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async rowAddedGrid(e: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.postCustomerDto(e.rowData));
  }

  public async rowEditDoneGrid(e: IGridEditDoneEventArgs): Promise<void> {
    if(e.isAddRow == false) {
      await firstValueFrom(this.northwindSwaggerService.putCustomerDto(e.rowData?.customerId, e.rowData));
    }
  }

  public async rowDeletedGrid(e: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.deleteCustomerDto(e.rowKey?.customerId));
  }
}

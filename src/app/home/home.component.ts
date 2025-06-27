import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGX_CARD_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxAvatarComponent, IgxIconComponent } from '@infragistics/igniteui-angular';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { MeetingsTasksType } from '../models/crmapp/meetings-tasks-type';
import { SalesType } from '../models/financial/sales-type';
import { CRMAppService } from '../services/crmapp.service';
import { FinancialService } from '../services/financial.service';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-home',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_CARD_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxCategoryChartModule, IgxIconComponent, IgxAvatarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public financialSales: SalesType[] = [];
  public northwindSwaggerCustomerDto: CustomerDto[] = [];
  public cRMAppMeetingsTasks: MeetingsTasksType[] = [];

  constructor(
    private financialService: FinancialService,
    private northwindSwaggerService: NorthwindSwaggerService,
    private cRMAppService: CRMAppService,
  ) {}


  ngOnInit() {
    this.financialService.getSales().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.financialSales = data
    );
    this.northwindSwaggerService.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerCustomerDto = data
    );
    this.cRMAppService.getMeetingsTasksList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.cRMAppMeetingsTasks = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

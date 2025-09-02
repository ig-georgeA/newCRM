import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IGridEditDoneEventArgs, IGX_CHIPS_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IgxButtonDirective, IgxDialogComponent, IgxIconComponent, IgxPaginatorComponent, IgxRippleDirective, IgxSnackbarComponent, IRowDataEventArgs } from 'igniteui-angular';
import { firstValueFrom, Subject, take, takeUntil } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { CustomerDtoForm } from '../models/northwind-swagger/customer-dto-forms';
import { CustomerDtoPagedResultDto } from '../models/northwind-swagger/customer-dto-paged-result-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-customers',
  imports: [IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IgxPaginatorComponent, IgxSnackbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  @ViewChild('newCustomerDialog', { static: true, read: IgxDialogComponent})
  private newCustomerDialog?: IgxDialogComponent;

  @ViewChild('snackbarsuccess', { static: true, read: IgxSnackbarComponent})
  private snackbarsuccess?: IgxSnackbarComponent;

  @ViewChild('snackbarerror', { static: true, read: IgxSnackbarComponent})
  private snackbarerror?: IgxSnackbarComponent;

  private destroy$: Subject<void> = new Subject<void>();
  public selectedCustomer?: CustomerDto;

  private _grid_Page_Size: number = 20;
  public get grid_Page_Size(): number {
    return this._grid_Page_Size;
  }
  public set grid_Page_Size(value: number) {
    this._grid_Page_Size = value;
    this.grid_Data_Request$.next();
  }
  public grid_Data_Request?: CustomerDtoPagedResultDto;
  public grid_Data_Request$: Subject<void> = new Subject<void>();


  private _grid_Page_Index: number = 0;
  public get grid_Page_Index(): number {
    return this._grid_Page_Index;
  }
  public set grid_Page_Index(value: number) {
    this._grid_Page_Index = value;
    this.grid_Data_Request$.next();
  }
  public value: string = '2';
  public value1?: string;
  public value2: string = '1';
  public customerDtoFormModel: FormGroup<CustomerDtoForm>;

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {
    this.customerDtoFormModel = this.createNew_customer_formFormGroup();
  }


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDtoPagedResultDto(this.grid_Page_Index ?? 0, this.grid_Page_Size ?? 0, '').pipe(takeUntil(this.destroy$)).subscribe(
      data => this.grid_Data_Request = data
    );
    this.grid_Data_Request$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.northwindSwaggerService.getCustomerDtoPagedResultDto(this.grid_Page_Index ?? 0, this.grid_Page_Size ?? 0, '').pipe(take(1)).subscribe(
        data => this.grid_Data_Request = data
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.grid_Data_Request$.complete();
  }

  public async rowEditDoneGrid(e: IGridEditDoneEventArgs): Promise<void> {
    if(e.isAddRow == false) {
      await firstValueFrom(this.northwindSwaggerService.putCustomerDto((e.rowData as CustomerDto)?.customerId ?? '', e.rowData as CustomerDto));
    }
  }

  public async rowAddedGrid(e: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.postCustomerDto(e.rowData as CustomerDto));
  }

  public async rowDeletedGrid(e: IRowDataEventArgs): Promise<void> {
    await firstValueFrom(this.northwindSwaggerService.deleteCustomerDto((e.rowData as CustomerDto)?.customerId ?? ''));
  }

  public async ngSubmitCustomerDto(): Promise<void> {
    if (this.customerDtoFormModel.invalid) {
      this.customerDtoFormModel.markAllAsTouched();
      return;
    }
    const data = await firstValueFrom(this.northwindSwaggerService.postCustomerDto(this.customerDtoFormModel.value as CustomerDto));
    if (data) {
      this.customerDtoFormModel.reset();
      this.newCustomerDialog?.toggle();
      this.grid_Page_Index = parseFloat('0');
      this.snackbarsuccess?.toggle();
    } else {
      this.snackbarerror?.toggle();
    }
  }

  private createNew_customer_formFormGroup() {
    return new FormGroup({
      customerId: new FormControl<string | undefined | null>(null),
      companyName: new FormControl<string | null>(null, [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
      contactName: new FormControl<string | undefined | null>(null, [Validators.minLength(0), Validators.maxLength(50)]),
      contactTitle: new FormControl<string | undefined | null>(null, [Validators.minLength(0), Validators.maxLength(50)]),
      address: new FormGroup({
        street: new FormControl<string | undefined | null>(null, [Validators.minLength(0), Validators.maxLength(100)]),
        city: new FormControl<string | undefined | null>(null, [Validators.minLength(0), Validators.maxLength(50)]),
        region: new FormControl<string | undefined | null>(null, [Validators.minLength(0), Validators.maxLength(50)]),
        postalCode: new FormControl<string | undefined | null>(null, [Validators.minLength(0), Validators.maxLength(20)]),
        country: new FormControl<string | undefined | null>(null, [Validators.required, Validators.minLength(0), Validators.maxLength(50)]),
        phone: new FormControl<string | undefined | null>(null, Validators.pattern('^\\+?[0-9][0-9\\-]{1,14}$')),
      }),
    });
  }

  public resetCustomerDto(e: Event): void {
    e.preventDefault();
    this.customerDtoFormModel.reset();
  }

  public clickButton(): void {
    this.customerDtoFormModel.reset();
    this.newCustomerDialog?.toggle();
  }
}

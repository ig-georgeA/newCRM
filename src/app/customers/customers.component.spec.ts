import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_SELECT_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxPaginatorComponent, IGX_CHIPS_DIRECTIVES, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IGX_BANNER_DIRECTIVES, IgxSnackbarComponent } from '@infragistics/igniteui-angular';
import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersComponent, NoopAnimationsModule, FormsModule, RouterTestingModule, HttpClientTestingModule, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_SELECT_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES, IgxPaginatorComponent, IGX_CHIPS_DIRECTIVES, IGX_GRID_ACTION_STRIP_DIRECTIVES, IGX_DIALOG_DIRECTIVES, IGX_BANNER_DIRECTIVES, IgxSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

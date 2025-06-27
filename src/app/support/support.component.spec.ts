import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IGX_GRID_DIRECTIVES } from '@infragistics/igniteui-angular';
import { IgxPieChartModule, IgxCategoryChartModule } from 'igniteui-angular-charts';
import { SupportComponent } from './support.component';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportComponent, NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IGX_GRID_DIRECTIVES, IgxPieChartModule, IgxCategoryChartModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

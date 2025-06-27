import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IGX_BUTTON_GROUP_DIRECTIVES } from '@infragistics/igniteui-angular';
import { DealsComponent } from './deals.component';

describe('DealsComponent', () => {
  let component: DealsComponent;
  let fixture: ComponentFixture<DealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsComponent, NoopAnimationsModule, FormsModule, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IGX_BUTTON_GROUP_DIRECTIVES]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

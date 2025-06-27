import { Component } from '@angular/core';
import { IgxIconComponent } from '@infragistics/igniteui-angular';
import { RevealViewOptions } from 'reveal-sdk-wrappers';
import { RevealViewComponent } from 'reveal-sdk-wrappers-angular';

@Component({
  selector: 'app-reports',
  imports: [IgxIconComponent, RevealViewComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  dashboardOptions: RevealViewOptions = {
    header: {
      showHeader: false
    },
    visualizations: {
      menu: {
        copy: false,
        duplicate: false
      }
    }
  };

  constructor() {
    $.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');
  }
}

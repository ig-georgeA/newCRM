import { Component } from '@angular/core';
import { IgxIconComponent } from 'igniteui-angular';
import { RevealViewOptions } from 'reveal-sdk-wrappers';
import { RevealViewComponent } from 'reveal-sdk-wrappers-angular';

@Component({
  selector: 'app-reports',
  imports: [IgxIconComponent, RevealViewComponent],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  public options: RevealViewOptions = {
    header: {
      showHeader: false,
      menu: {
        showMenu: false
      }
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
    this.setRevealTheme();
  }

  private setRevealTheme() {
    const style = window.getComputedStyle(document.body);
    const theme = new $.ig.RevealTheme();
    theme.regularFont = style.getPropertyValue('--ig-font-family')?.trim() || 'sans-serif';
    theme.mediumFont = theme.regularFont;
    theme.boldFont = theme.regularFont;

    const color = style.getPropertyValue('--ig-surface-500').trim() || '#fff';
    const [r, g, b] = [1, 3, 5].map(i => parseInt(color.substring(i, i + 2), 16));
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    theme.isDark = brightness < 128;
    theme.fontColor = theme.isDark ? 'white' : 'black';
    theme.dashboardBackgroundColor = style.getPropertyValue('--ig-gray-100').trim();
    theme.visualizationBackgroundColor = style.getPropertyValue('--ig-surface-500').trim();

    $.ig.RevealSdkSettings.theme = theme;
  }
}

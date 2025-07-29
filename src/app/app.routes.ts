import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DealsComponent } from './deals/deals.component';
import { ReportsComponent } from './reports/reports.component';
import { SupportComponent } from './support/support.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'customers', component: CustomersComponent, data: { text: 'Customers' } },
  { path: 'customer-details/:rCustomerID', component: CustomerDetailsComponent, data: { text: 'Customer-Details' } },
  { path: 'deals', component: DealsComponent, data: { text: 'Deals' } },
  { path: 'reports', component: ReportsComponent, data: { text: 'Reports' } },
  { path: 'support', component: SupportComponent, data: { text: 'Support' } },
  { path: 'calendar', component: CalendarComponent, data: { text: 'Calendar' } },
  { path: 'tasks', component: TasksComponent, data: { text: 'Tasks' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

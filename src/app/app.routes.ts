import { Routes } from '@angular/router';
import { PositionDashboard } from './features/positions/position-dashboard/position-dashboard';

export const routes: Routes = [
  { path: '', component: PositionDashboard },
  { path: 'dashboard', component: PositionDashboard },
  { path: '**', redirectTo: '' }
];

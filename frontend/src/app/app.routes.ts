import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'comparison', loadComponent: () => import('./features/comparison/comparison').then(m => m.ComparisonComponent) },
      { path: 'visualization', loadComponent: () => import('./features/visualization/visualization').then(m => m.VisualizationComponent) },
      { path: '', redirectTo: 'comparison', pathMatch: 'full' }
    ]
  }
];

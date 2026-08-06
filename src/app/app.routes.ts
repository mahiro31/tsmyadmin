import { Routes } from '@angular/router';
import { App } from './app';
import { ExsampleComponent } from './exsample/exsample.component';
import { Sample } from './sample/sample';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'sample', component: Sample },
  { path: 'exsample', component: ExsampleComponent },
];

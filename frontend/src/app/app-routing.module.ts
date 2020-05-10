import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
    // loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'build',
    loadChildren: () => import('./modules/builder/builder.module').then(m => m.BuilderModule)
  },
  {
    path: 'mockup',
    loadChildren: () => import('./modules/builder/builder.module').then(m => m.BuilderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

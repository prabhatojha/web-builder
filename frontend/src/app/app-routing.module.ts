import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
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

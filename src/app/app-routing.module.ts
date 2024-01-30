
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErComponent } from './er/er.component';
import { Cl1Component } from './cl1/cl1.component';
import { Cl2Component } from './cl2/cl2.component';
import {AdminComponent} from './admin/admin.component';
import {TestComponent} from './test/test.component';
import {CailComponent} from './cail/cail.component'


const routes: Routes = [
  { path: 'er', component: ErComponent },
  { path: 'cl1', component: Cl1Component },
  { path: 'cl2', component: Cl2Component },
  { path: 'admin', component: AdminComponent },
  { path: 'test', component: TestComponent },
  { path: 'cail', component: CailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

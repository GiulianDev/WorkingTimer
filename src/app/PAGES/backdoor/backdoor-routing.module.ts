import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackdoorPage } from './backdoor.page';

const routes: Routes = [
  {
    path: '',
    component: BackdoorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackdoorPageRoutingModule {}

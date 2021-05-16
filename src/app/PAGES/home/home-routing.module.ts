import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerService } from 'src/app/SERVICE/Timer/timer.service';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TimerService]
})
export class HomePageRoutingModule {}

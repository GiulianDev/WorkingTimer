import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerService } from 'src/app/SERVICE/Timer/timer.service';
import { HomePage } from './home.page';
import { HomeResolver } from './home.resolve';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      bool: HomeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TimerService,
    HomeResolver]
})
export class HomePageRoutingModule {}

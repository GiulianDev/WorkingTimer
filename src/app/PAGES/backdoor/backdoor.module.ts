import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackdoorPageRoutingModule } from './backdoor-routing.module';

import { BackdoorPage } from './backdoor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackdoorPageRoutingModule
  ],
  declarations: [BackdoorPage]
})
export class BackdoorPageModule {}

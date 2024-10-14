import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    SideBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[
    SideBarComponent,
  ]
})
export class SharedModule { }

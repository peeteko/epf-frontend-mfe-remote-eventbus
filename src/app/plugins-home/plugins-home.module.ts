import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsHomeComponent } from './plugins-home.component';
import { PluginsHomeRoutingModule } from './plugins-home-routing.module';




@NgModule({
  declarations: [
    PluginsHomeComponent
  ],
  imports: [
    CommonModule,
    PluginsHomeRoutingModule
  ]
})
export class PluginsHomeModule { }

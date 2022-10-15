import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NotesComponent } from '../notes/notes.component';
import { DashboardRoutingModule } from './dashboard.module.router';
import { NotesService } from '../services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent, NotesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule, RouterModule
  ],
  providers:[NotesService]
})
export class DashboardModule { }

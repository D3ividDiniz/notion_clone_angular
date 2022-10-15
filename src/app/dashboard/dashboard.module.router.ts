import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: ':id', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

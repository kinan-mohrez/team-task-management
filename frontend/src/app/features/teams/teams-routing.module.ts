import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamDetailsComponent } from './pages/team-details/team-details.component';
import { TeamFormComponent } from './pages/team-form/team-form.component';
import { TeamListComponent } from './pages/team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent,
  },
  {
    path: 'new',
    component: TeamFormComponent,
  },
  {
    path: ':id',
    component: TeamDetailsComponent,
  },
  {
    path: ':id/edit',
    component: TeamFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}

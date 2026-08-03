import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'new',
    component: ProjectFormComponent,
  },
  {
    path: ':id/edit',
    component: ProjectFormComponent,
  },
  {
    path: ':id',
    component: ProjectDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}

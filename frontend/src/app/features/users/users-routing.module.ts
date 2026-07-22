import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserFormComponent } from './pages/user-form/user-form.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'new',
    component: UserFormComponent,
  },
  {
    path: ':id/edit',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

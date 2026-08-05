import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { TeamFormComponent } from './pages/team-form/team-form.component';
import { TeamDetailsComponent } from './pages/team-details/team-details.component';
import { DeleteTeamDialogComponent } from './components/delete-team-dialog/delete-team-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    TeamListComponent,
    TeamFormComponent,
    TeamDetailsComponent,
    DeleteTeamDialogComponent,
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatPaginatorModule,
  ],
})
export class TeamsModule {}

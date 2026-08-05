import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';

import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteTaskDialogComponent } from './components/delete-task-dialog/delete-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    DeleteTaskDialogComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
})
export class TasksModule {}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../../models/tasks/task.model';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-task-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent {
  constructor(
    public readonly dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly task: Task,
  ) {}

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public confirmDelete(): void {
    this.dialogRef.close(true);
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../../models/tasks/task.model';

@Component({
  selector: 'app-delete-task-dialog',
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

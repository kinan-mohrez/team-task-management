import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/project/project.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-delete-project-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.scss'],
})
export class DeleteProjectDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly project: Project,
  ) {}

  public confirmDelete(): void {
    this.dialogRef.close(true);
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}

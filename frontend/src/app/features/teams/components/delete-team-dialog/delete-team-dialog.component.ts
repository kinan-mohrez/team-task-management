import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Team } from 'src/app/models/team/team.model';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-team-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-team-dialog.component.html',
  styleUrls: ['./delete-team-dialog.component.scss'],
})
export class DeleteTeamDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<DeleteTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public readonly team: Team,
  ) {}

  public confirmDelete(): void {
    this.dialogRef.close(true);
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}

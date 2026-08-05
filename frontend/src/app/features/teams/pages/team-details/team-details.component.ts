import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Team } from 'src/app/models/team/team.model';

import { DeleteTeamDialogComponent } from '../../components/delete-team-dialog/delete-team-dialog.component';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit, OnDestroy {
  public team!: Team;

  public isLoading: boolean = false;

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly teamService: TeamService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.loadTeam();
  }

  private loadTeam(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/teams']);
      return;
    }

    this.isLoading = true;

    this.teamService
      .getTeamById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (team: Team) => {
          this.team = team;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load team.');
          this.router.navigate(['/teams']);
        },
      });
  }

  public goBack(): void {
    this.router.navigate(['/teams']);
  }

  public editTeam(): void {
    this.router.navigate(['/teams', this.team.id, 'edit']);
  }

  public deleteTeam(): void {
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      width: '420px',
      disableClose: true,
      data: this.team,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.teamService
          .deleteTeam(this.team.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Team deleted successfully.',
              );

              this.router.navigate(['/teams']);
            },
            error: () => {
              this.notificationService.showError('Failed to delete team.');
            },
          });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

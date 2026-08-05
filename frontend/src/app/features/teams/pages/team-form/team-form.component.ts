import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Team } from 'src/app/models/team/team.model';

import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;

  public isEditMode: boolean = false;
  public isLoading: boolean = false;

  private teamId!: number;

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly fb: FormBuilder,
    private readonly teamService: TeamService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.teamId = Number(id);
      this.loadTeam();
    }
  }

  private loadTeam(): void {
    this.isLoading = true;

    this.teamService
      .getTeamById(this.teamId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (team: Team) => {
          this.form.patchValue(team);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load team.');
          this.router.navigate(['/teams']);
        },
      });
  }

  public save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const team: Team = {
      id: this.teamId,
      ...this.form.value,
    };

    this.isLoading = true;

    const request = this.isEditMode
      ? this.teamService.updateTeam(this.teamId, team)
      : this.teamService.createTeam(team);

    request.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.isEditMode
            ? 'Team updated successfully.'
            : 'Team created successfully.',
        );

        this.router.navigate(['/teams']);
      },
      error: () => {
        this.isLoading = false;

        this.notificationService.showError(
          this.isEditMode ? 'Failed to update team.' : 'Failed to create team.',
        );
      },
    });
  }

  public cancel(): void {
    this.router.navigate(['/teams']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

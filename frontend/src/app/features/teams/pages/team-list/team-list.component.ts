import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Team } from 'src/app/models/team/team.model';

import { DeleteTeamDialogComponent } from '../../components/delete-team-dialog/delete-team-dialog.component';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort)
  public sort!: MatSort;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  public dataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>();

  public searchValue: string = '';
  public isLoading: boolean = false;
  public hasActiveFilters: boolean = false;

  public sortField: string = 'name';
  public sortDirection: SortDirection = 'asc';

  public totalItems: number = 0;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 50];

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly teamService: TeamService,
    private readonly notificationService: NotificationService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadTeams();
  }

  public loadTeams(): void {
    this.isLoading = true;

    this.teamService
      .getTeams()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (teams: Team[]) => {
          this.dataSource.data = teams;
          this.totalItems = teams.length;
          this.isLoading = false;
        },
        error: () => {
          this.notificationService.showError('Failed to load teams.');
          this.isLoading = false;
        },
      });
  }

  public addTeam(): void {
    this.router.navigate(['/teams/new']);
  }

  public viewTeam(team: Team): void {
    this.router.navigate(['/teams', team.id]);
  }

  public editTeam(team: Team): void {
    this.router.navigate(['/teams', team.id, 'edit']);
  }

  public deleteTeam(team: Team): void {
    const dialogRef = this.dialog.open(DeleteTeamDialogComponent, {
      width: '400px',
      data: team,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed: boolean) => {
        if (!confirmed) {
          return;
        }

        this.teamService
          .deleteTeam(team.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.loadTeams();

              this.notificationService.showSuccess(
                'Team deleted successfully.',
              );
            },
            error: () => {
              this.notificationService.showError('Failed to delete team.');
            },
          });
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (team: Team, filter: string): boolean => {
      const searchText = filter.trim().toLowerCase();

      return (
        team.name.toLowerCase().includes(searchText) ||
        team.description.toLowerCase().includes(searchText)
      );
    };
  }

  public applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    this.hasActiveFilters = this.searchValue.trim().length > 0;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

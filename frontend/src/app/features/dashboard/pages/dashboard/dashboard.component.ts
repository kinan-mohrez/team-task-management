import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DashboardStatistic } from 'src/app/models/dashboard/dashboard-statistic.model';
import { RecentTask } from 'src/app/models/dashboard/recent-task.model';
import { UpcomingDeadline } from 'src/app/models/dashboard/upcoming-deadline.model';

import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public statistics: DashboardStatistic[] = [];
  public recentTasks: RecentTask[] = [];
  public upcomingDeadlines: UpcomingDeadline[] = [];

  public readonly displayedColumns: string[] = [
    'title',
    'project',
    'status',
    'dueDate',
  ];

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly dashboardService: DashboardService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadDashboardData();
  }

  public loadDashboardData(): void {
    this.dashboardService
      .getStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (statistics: DashboardStatistic[]) => {
          this.statistics = statistics;
        },
      });

    this.recentTasks = this.dashboardService.getRecentTasks();
    this.upcomingDeadlines = this.dashboardService.getUpcomingDeadlines();
  }

  public onStatisticClick(statistic: DashboardStatistic): void {
    this.router.navigate(['/tasks']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

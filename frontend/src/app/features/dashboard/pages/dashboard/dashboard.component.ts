import { Component, OnInit } from '@angular/core';

import { DashboardStatistic } from 'src/app/models/dashboard/dashboard-statistic.model';
import { RecentTask } from 'src/app/models/dashboard/recent-task.model';
import { UpcomingDeadline } from 'src/app/models/dashboard/upcoming-deadline.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public statistics: DashboardStatistic[] = [];
  public recentTasks: RecentTask[] = [];
  public upcomingDeadlines: UpcomingDeadline[] = [];

  public readonly displayedColumns: string[] = [
    'title',
    'project',
    'status',
    'dueDate',
  ];

  public constructor(private dashboardService: DashboardService) {}

  public ngOnInit(): void {
    this.loadDashboardData();
  }

  public loadDashboardData(): void {
    this.statistics = this.dashboardService.getStatistics();
    this.recentTasks = this.dashboardService.getRecentTasks();
    this.upcomingDeadlines = this.dashboardService.getUpcomingDeadlines();
  }
}

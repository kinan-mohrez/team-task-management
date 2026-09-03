import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { DashboardStatisticsResponse } from 'src/app/core/dto/dashboard/dashboard-statistics-response.model';
import { DashboardStatistic } from 'src/app/models/dashboard/dashboard-statistic.model';
import { RecentTask } from 'src/app/models/dashboard/recent-task.model';
import { UpcomingDeadline } from 'src/app/models/dashboard/upcoming-deadline.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl: string = 'http://localhost:8080/api/dashboard';

  public constructor(private readonly http: HttpClient) {}

  public getStatistics(): Observable<DashboardStatistic[]> {
    return this.http
      .get<DashboardStatisticsResponse>(`${this.apiUrl}/statistics`)
      .pipe(
        map((response: DashboardStatisticsResponse): DashboardStatistic[] => [
          {
            title: 'My Tasks',
            value: response.totalTasks,
            icon: 'assignment',
          },
          {
            title: 'In Progress',
            value: response.inProgressTasks,
            icon: 'pending_actions',
          },
          {
            title: 'Completed',
            value: response.completedTasks,
            icon: 'task_alt',
          },
          {
            title: 'Overdue',
            value: response.overdueTasks,
            icon: 'warning',
          },
        ]),
      );
  }

  public getRecentTasks(): RecentTask[] {
    return [
      {
        id: 1,
        title: 'Create login page',
        project: 'Team Task Management',
        status: 'Completed',
        dueDate: new Date('2026-07-22'),
      },
      {
        id: 2,
        title: 'Design dashboard',
        project: 'Team Task Management',
        status: 'In Progress',
        dueDate: new Date('2026-07-24'),
      },
      {
        id: 3,
        title: 'Users management',
        project: 'Team Task Management',
        status: 'To Do',
        dueDate: new Date('2026-07-28'),
      },
    ];
  }

  public getUpcomingDeadlines(): UpcomingDeadline[] {
    return [
      {
        id: 1,
        title: 'Complete dashboard design',
        project: 'Team Task Management',
        dueDate: new Date('2026-07-24'),
      },
      {
        id: 2,
        title: 'Create users management page',
        project: 'Team Task Management',
        dueDate: new Date('2026-07-28'),
      },
      {
        id: 3,
        title: 'Connect task API',
        project: 'Team Task Management',
        dueDate: new Date('2026-08-01'),
      },
    ];
  }
}

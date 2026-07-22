import { Injectable } from '@angular/core';

import { DashboardStatistic } from 'src/app/models/dashboard/dashboard-statistic.model';
import { RecentTask } from 'src/app/models/dashboard/recent-task.model';
import { UpcomingDeadline } from 'src/app/models/dashboard/upcoming-deadline.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public getStatistics(): DashboardStatistic[] {
    return [
      {
        title: 'My Tasks',
        value: 12,
        icon: 'assignment',
      },
      {
        title: 'In Progress',
        value: 5,
        icon: 'pending_actions',
      },
      {
        title: 'Completed',
        value: 24,
        icon: 'task_alt',
      },
      {
        title: 'Overdue',
        value: 2,
        icon: 'warning',
      },
    ];
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

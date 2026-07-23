import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Project } from '../../../../models/project/project.model';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DeleteProjectDialogComponent } from '../../components/delete-project-dialog/delete-project-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'status',
    'actions',
  ];

  public dataSource: MatTableDataSource<Project> =
    new MatTableDataSource<Project>();

  public constructor(
    private readonly projectService: ProjectService,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.loadProjects();
  }

  public loadProjects(): void {
    this.dataSource.data = this.projectService.getProjects();
  }

  public deleteProject(project: Project): void {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: '420px',
      disableClose: true,
      data: project,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }

      this.projectService.deleteProject(project.id);
      this.loadProjects();
      this.notificationService.showSuccess('Project deleted successfully.');
    });
  }
}

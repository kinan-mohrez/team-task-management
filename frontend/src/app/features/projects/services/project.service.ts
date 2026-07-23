import { Injectable } from '@angular/core';

import { Project } from 'src/app/models/project/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      name: 'Team Task Management System',
      description: 'Full Stack application for managing teams and tasks.',
      startDate: '2026-07-01',
      endDate: '2026-12-31',
      status: 'IN_PROGRESS',
    },
    {
      id: 2,
      name: 'Company Website',
      description: 'Redesign of the company website.',
      startDate: '2026-06-01',
      endDate: '2026-09-30',
      status: 'PLANNED',
    },
  ];

  public getProjects(): Project[] {
    return [...this.projects];
  }

  public getProjectById(id: number): Project | undefined {
    return this.projects.find((project: Project) => project.id === id);
  }

  public createProject(project: Project): void {
    const nextId =
      Math.max(
        ...this.projects.map((currentProject: Project) => currentProject.id),
        0,
      ) + 1;

    this.projects.push({
      ...project,
      id: nextId,
    });
  }

  public updateProject(project: Project): void {
    const projectIndex = this.projects.findIndex(
      (currentProject: Project) => currentProject.id === project.id,
    );

    if (projectIndex === -1) {
      return;
    }

    this.projects[projectIndex] = {
      ...project,
    };
  }

  public deleteProject(id: number): void {
    this.projects = this.projects.filter(
      (project: Project) => project.id !== id,
    );
  }
}

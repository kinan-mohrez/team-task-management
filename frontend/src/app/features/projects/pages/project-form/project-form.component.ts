import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CreateProjectRequest } from 'src/app/core/dto/projects/create-project-request.model';
import { UpdateProjectRequest } from 'src/app/core/dto/projects/update-project-request.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Project } from 'src/app/models/project/project.model';

import { ProjectService } from '../../services/project.service';
import { ProjectStatus } from 'src/app/shared/enums/project-status';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  public projectForm!: FormGroup;

  public isEditMode: boolean = false;
  public isLoading: boolean = false;
  public projectId: number | null = null;

  public readonly statuses: ProjectStatus[] = Object.values(ProjectStatus);

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectService,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.initializeRouteMode();
    this.initializeForm();

    if (this.isEditMode) {
      this.loadProject();
    }
  }

  public onSubmit(): void {
    if (this.projectForm.invalid || this.isLoading) {
      this.projectForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      this.updateProject();
      return;
    }

    this.createProject();
  }

  public onCancel(): void {
    this.router.navigate(['/projects']);
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control: AbstractControl | null = this.projectForm.get(controlName);

    return Boolean(control && control.touched && control.hasError(errorName));
  }

  private initializeRouteMode(): void {
    const idParameter: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (!idParameter) {
      return;
    }

    const parsedProjectId: number = Number(idParameter);

    if (!Number.isInteger(parsedProjectId) || parsedProjectId <= 0) {
      this.notificationService.showError('Invalid project ID.');
      this.router.navigate(['/projects']);
      return;
    }

    this.projectId = parsedProjectId;
    this.isEditMode = true;
  }

  private initializeForm(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private loadProject(): void {
    if (this.projectId === null) {
      return;
    }

    this.isLoading = true;

    this.projectService
      .getProjectById(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project: Project) => {
          this.projectForm.patchValue({
            name: project.name,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            status: project.status,
          });

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load project.');
          this.router.navigate(['/projects']);
        },
      });
  }
  private createProject(): void {
    const request: CreateProjectRequest = {
      name: this.projectForm.controls['name'].value,
      description: this.projectForm.controls['description'].value,
      startDate: this.projectForm.controls['startDate'].value,
      endDate: this.projectForm.controls['endDate'].value,
      status: this.projectForm.controls['status'].value,
    };

    this.isLoading = true;

    this.projectService
      .createProject(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Project created successfully.');
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Create project failed:', error);
          this.notificationService.showError('Failed to create project.');
        },
      });
  }

  private updateProject(): void {
    if (this.projectId === null) {
      return;
    }

    const request: UpdateProjectRequest = {
      name: this.projectForm.controls['name'].value,
      description: this.projectForm.controls['description'].value,
      startDate: this.projectForm.controls['startDate'].value,
      endDate: this.projectForm.controls['endDate'].value,
      status: this.projectForm.controls['status'].value,
    };

    this.isLoading = true;

    this.projectService
      .updateProject(this.projectId, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Project updated successfully.');
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Update project failed:', error);
          this.notificationService.showError('Failed to update project.');
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

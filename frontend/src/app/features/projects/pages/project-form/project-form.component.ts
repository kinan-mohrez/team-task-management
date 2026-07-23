import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from 'src/app/core/services/notification.service';
import { Project } from 'src/app/models/project/project.model';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  public projectForm!: FormGroup;

  public isEditMode: boolean = false;

  public projectId: number | null = null;

  public readonly statuses: string[] = [
    'PLANNED',
    'IN_PROGRESS',
    'COMPLETED',
    'ON_HOLD',
  ];

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly projectService: ProjectService,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.initializeEditMode();
  }

  public onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const project: Project = {
      id: this.projectId ?? 0,
      name: this.projectForm.controls['name'].value,
      description: this.projectForm.controls['description'].value,
      startDate: this.projectForm.controls['startDate'].value,
      endDate: this.projectForm.controls['endDate'].value,
      status: this.projectForm.controls['status'].value,
    };

    if (this.isEditMode) {
      this.projectService.updateProject(project);
      this.notificationService.showSuccess('Project updated successfully.');
    } else {
      this.projectService.createProject(project);
      this.notificationService.showSuccess('Project created successfully.');
    }

    this.router.navigate(['/projects']);
  }

  public onCancel(): void {
    this.router.navigate(['/projects']);
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.projectForm.get(controlName);

    return Boolean(control && control.touched && control.hasError(errorName));
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

  private initializeEditMode(): void {
    const idParameter = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idParameter) {
      return;
    }

    this.projectId = Number(idParameter);

    if (Number.isNaN(this.projectId)) {
      this.router.navigate(['/projects']);
      return;
    }

    this.isEditMode = true;

    const project = this.projectService.getProjectById(this.projectId);

    if (!project) {
      this.router.navigate(['/projects']);
      return;
    }

    this.projectForm.patchValue({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
    });
  }
}

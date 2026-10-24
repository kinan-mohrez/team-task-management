import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [
        {
            provide: MatSnackBar,
            useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
        {
            provide: MatDialog,
            useValue: jasmine.createSpyObj('MatDialog', {
                open: { afterClosed: () => of(false) },
            }),
        },
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: { paramMap: convertToParamMap({ id: '1' }) },
            },
        },
    ],
    imports: [
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TaskDetailsComponent,
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    const tasksRequest = http.expectOne(
      request => request.url === 'http://localhost:8080/api/tasks/1',
    );
    expect(tasksRequest.request.method).toBe('GET');
    tasksRequest.flush({
      id: 1,
      title: 'Test task',
      description: 'Task description',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: '2026-09-30',
      projectId: 1,
      projectName: 'Test project',
      assignedUserId: 1,
      assignedUserName: 'Test User',
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

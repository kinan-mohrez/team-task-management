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

import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

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
        ProjectDetailsComponent,
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    const projectsRequest = http.expectOne(
      request => request.url === 'http://localhost:8080/api/projects/1',
    );
    expect(projectsRequest.request.method).toBe('GET');
    projectsRequest.flush({
      id: 1,
      name: 'Test project',
      description: 'Project description',
      startDate: '2026-09-01',
      endDate: '2026-09-30',
      status: 'IN_PROGRESS',
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

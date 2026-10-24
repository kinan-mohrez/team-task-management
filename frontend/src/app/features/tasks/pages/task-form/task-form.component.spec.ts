import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [
        {
            provide: MatSnackBar,
            useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
    ],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TaskFormComponent,
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    const projectsRequest = http.expectOne(
      request => request.url === 'http://localhost:8080/api/projects',
    );
    expect(projectsRequest.request.method).toBe('GET');
    projectsRequest.flush({
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 10,
      number: 0,
      first: true,
      last: true,
    });
    const usersRequest = http.expectOne(
      request => request.url === 'http://localhost:8080/api/users',
    );
    expect(usersRequest.request.method).toBe('GET');
    usersRequest.flush({
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: 10,
      number: 0,
      first: true,
      last: true,
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

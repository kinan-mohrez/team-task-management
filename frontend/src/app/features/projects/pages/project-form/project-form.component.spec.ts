import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectFormComponent } from './project-form.component';

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    providers: [
        {
            provide: MatSnackBar,
            useValue: jasmine.createSpyObj('MatSnackBar', ['open']),
        },
    ],
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ProjectFormComponent,
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

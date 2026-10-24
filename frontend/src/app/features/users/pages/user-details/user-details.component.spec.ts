import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

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
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        UserDetailsComponent,
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    const usersRequest = http.expectOne(
      request => request.url === 'http://localhost:8080/api/users/1',
    );
    expect(usersRequest.request.method).toBe('GET');
    usersRequest.flush({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      email: 'test@example.com',
      role: 'MEMBER',
      enabled: true,
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

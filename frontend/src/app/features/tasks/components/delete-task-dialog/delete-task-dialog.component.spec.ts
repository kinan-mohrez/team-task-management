import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskDialogComponent } from './delete-task-dialog.component';

describe('DeleteTaskDialogComponent', () => {
  let component: DeleteTaskDialogComponent;
  let fixture: ComponentFixture<DeleteTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
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
          },
        },
      ],
      imports: [
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [ DeleteTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

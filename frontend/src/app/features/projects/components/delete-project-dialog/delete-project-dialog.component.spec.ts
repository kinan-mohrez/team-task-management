import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectDialogComponent } from './delete-project-dialog.component';

describe('DeleteProjectDialogComponent', () => {
  let component: DeleteProjectDialogComponent;
  let fixture: ComponentFixture<DeleteProjectDialogComponent>;

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
                name: 'Test project',
                description: 'Project description',
                startDate: '2026-09-01',
                endDate: '2026-09-30',
                status: 'IN_PROGRESS',
            },
        },
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
        DeleteProjectDialogComponent,
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

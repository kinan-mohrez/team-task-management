import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { DeleteUserDialogComponent } from './delete-user-dialog.component';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
        DeleteUserDialogComponent,
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                username: 'testuser',
                email: 'test@example.com',
                role: 'MEMBER',
                enabled: true,
            },
        },
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

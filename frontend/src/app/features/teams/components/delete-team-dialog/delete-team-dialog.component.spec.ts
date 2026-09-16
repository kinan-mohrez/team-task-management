import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamDialogComponent } from './delete-team-dialog.component';

describe('DeleteTeamDialogComponent', () => {
  let component: DeleteTeamDialogComponent;
  let fixture: ComponentFixture<DeleteTeamDialogComponent>;

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
            name: 'Test team',
            description: 'Team description',
          },
        },
      ],
      imports: [
        MatButtonModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [ DeleteTeamDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

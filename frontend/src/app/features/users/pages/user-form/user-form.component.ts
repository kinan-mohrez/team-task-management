import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateUserRequest } from 'src/app/core/dto/users/create-user-request.model';
import { UpdateUserRequest } from 'src/app/core/dto/users/update-user-request.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { User } from 'src/app/models/users/user.model';
import { UserRole } from 'src/app/shared/enums/user-role';

import { UsersService } from '../../services/users.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;
  public isEditMode: boolean = false;
  public isLoading: boolean = false;
  public userId: number | null = null;

  private readonly destroy$ = new Subject<void>();

  public readonly roles: UserRole[] = Object.values(UserRole);

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.initializeRouteMode();
    this.initializeForm();

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  public onSubmit(): void {
    if (this.userForm.invalid || this.isLoading) {
      this.userForm.markAllAsTouched();
      if (this.userForm.hasError('passwordMismatch')) {
        this.userForm
          .get('confirmPassword')
          ?.setErrors({ passwordMismatch: true });
      }
      return;
    }

    if (this.isEditMode) {
      this.updateUser();
      return;
    }

    this.createUser();
  }

  public onCancel(): void {
    this.router.navigate(['/users']);
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control: AbstractControl | null = this.userForm.get(controlName);

    return Boolean(control && control.touched && control.hasError(errorName));
  }

  private initializeRouteMode(): void {
    const idParameter: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (!idParameter) {
      return;
    }

    const parsedUserId: number = Number(idParameter);

    if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
      this.notificationService.showError('Invalid user ID.');
      this.router.navigate(['/users']);
      return;
    }

    this.userId = parsedUserId;
    this.isEditMode = true;
  }

  private initializeForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: [
        '',
        this.isEditMode ? [] : [Validators.required, Validators.minLength(8)],
      ],
      confirmPassword: ['', this.isEditMode ? [] : [Validators.required]],
      role: ['', Validators.required],
      enabled: [true],
    });

    if (!this.isEditMode) {
      this.userForm.addValidators(this.passwordMatchValidator);
    }
  }

  private loadUser(): void {
    if (this.userId === null) {
      return;
    }

    this.isLoading = true;

    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            enabled: user.enabled,
          });

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError('Failed to load user.');
          this.router.navigate(['/users']);
        },
      });
  }

  private passwordMatchValidator = (
    control: AbstractControl,
  ): { passwordMismatch: boolean } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return {
        passwordMismatch: true,
      };
    }

    return null;
  };
  private createUser(): void {
    const request: CreateUserRequest = {
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      username: this.userForm.controls['username'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      role: this.userForm.controls['role'].value,
      enabled: this.userForm.controls['enabled'].value,
    };

    this.isLoading = true;

    this.usersService
      .createUser(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('User created successfully.');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Create user failed:', error);
          this.notificationService.showError('Failed to create user.');
        },
      });
  }

  private updateUser(): void {
    if (this.userId === null) {
      return;
    }

    const request: UpdateUserRequest = {
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      username: this.userForm.controls['username'].value,
      email: this.userForm.controls['email'].value,
      role: this.userForm.controls['role'].value,
      enabled: this.userForm.controls['enabled'].value,
    };

    this.isLoading = true;

    this.usersService
      .updateUser(this.userId, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('User updated successfully.');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Update user failed:', error);
          this.notificationService.showError('Failed to update user.');
        },
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

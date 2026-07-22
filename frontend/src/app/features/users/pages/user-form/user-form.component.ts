import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models/users/user.model';

import { UsersService } from '../../services/users.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public userForm!: FormGroup;

  public isEditMode = false;

  public userId: number | null = null;

  public readonly roles: string[] = ['ADMIN', 'MANAGER', 'MEMBER'];

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.initializeEditMode();
  }

  public onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: User = {
      id: this.userId ?? 0,
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
      role: this.userForm.controls['role'].value,
      enabled: this.userForm.controls['enabled'].value,
    };

    if (this.isEditMode) {
      this.usersService.updateUser(user);
      this.notificationService.showSuccess('User updated successfully.');
    } else {
      this.usersService.createUser(user);
      this.notificationService.showSuccess('User created successfully.');
    }

    this.router.navigate(['/users']);
  }

  public onCancel(): void {
    this.router.navigate(['/users']);
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.userForm.get(controlName);

    return Boolean(control && control.touched && control.hasError(errorName));
  }

  private initializeForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      role: ['', Validators.required],
      enabled: [true],
    });
  }

  private initializeEditMode(): void {
    const idParameter = this.activatedRoute.snapshot.paramMap.get('id');

    if (!idParameter) {
      return;
    }

    this.userId = Number(idParameter);

    if (Number.isNaN(this.userId)) {
      this.router.navigate(['/users']);
      return;
    }

    this.isEditMode = true;

    const user = this.usersService.getUserById(this.userId);

    if (!user) {
      this.router.navigate(['/users']);
      return;
    }

    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      enabled: user.enabled,
    });
  }
}

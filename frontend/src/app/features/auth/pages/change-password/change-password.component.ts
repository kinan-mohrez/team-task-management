import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm!: FormGroup;

  public hideCurrentPassword = true;
  public hideNewPassword = true;
  public hideConfirmPassword = true;

  public isLoading = false;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  public changePassword(): void {
    if (this.changePasswordForm.invalid || this.isLoading) {
      return;
    }

    // سيتم ربطها بالـ Backend في خطوة لاحقة
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-change-password',
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

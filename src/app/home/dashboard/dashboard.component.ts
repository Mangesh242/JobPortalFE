import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ FormsModule,
      RouterModule,
      MatProgressSpinnerModule,
      CommonModule,
      MatInputModule,
      MatButtonModule,
      MatFormFieldModule,
      MatGridListModule,
      FlexLayoutModule,
      MatSnackBarModule,
      CommonModule,
      ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  jobForm: FormGroup;
  jobPosts: any[] = [];

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      salaryRange: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.jobPosts.push(this.jobForm.value);
      this.jobForm.reset();
    }
  }
}

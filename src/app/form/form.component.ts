import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-report-form',
  templateUrl: './form.component.html',
  imports:[ReactiveFormsModule, FormsModule]
})
export class FormComponent {
  reportForm: FormGroup;
  responseMessage: string = '';

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.reportForm = this.fb.group({
      // Report Configuration
      reportConfig: this.fb.group({
        exportFormat: ['pdf'],
        outputPath: ['C:/generated-reports/'],
        locale: ['en_US'],
        timeZone: ['UTC']
      }),
      dataSource: this.fb.group({
        connectionDetails: this.fb.group({
          url: [''],
          username: ['sa'],
          password: ['Microsoft@1234']
        })
      }),

      parameters: this.fb.group({
        Param1: [''],
        Param2: [''],
        Param3: [''],
        reportTitle: ['']
      }),

      reports: this.fb.array([
        this.fb.group({
          reportPath: ['Files/JasperTemplate/Dynamic_AWBStatus_Report.jrxml'],

        })
      ])
    });
  }

  onSubmit() {
      // Send the payload to the backend
      console.log('backend')
      this.reportForm.value
      this.reportService.generateReports(this.reportForm.value).subscribe({
        next: response => {
          this.responseMessage = `Success: ${response}`;
        },
        error: error => {
          console.error('Error Response:', error);
          this.responseMessage = `Error: ${error.error?.message || 'An unexpected error occurred.'}`;
        },
      }); 
  }
}

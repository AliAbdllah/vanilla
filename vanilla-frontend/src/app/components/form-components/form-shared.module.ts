import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppTextComponent } from './app-text/app-text.component';
import { AppSelectComponent } from './app-select/app-select.component';
import { AppRadioComponent } from './app-radio/app-radio.component';
import { AppTextAreaComponent } from './app-text-area/app-text-area.component';
import { AppDateComponent } from './app-date/app-date.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AppPhoneNumberComponent } from './app-phone-number/app-phone-number.component';
import { AppCheckboxComponent } from './app-checkbox/app-checkbox.component';
import { AppFileUploadComponent } from './app-file-upload/app-file-upload.component';
const formComponents = [
  AppTextComponent,
  AppSelectComponent,
  AppRadioComponent,
  AppTextAreaComponent,
  AppDateComponent,
  AppPhoneNumberComponent,
  AppCheckboxComponent,
  AppFileUploadComponent,
];
@NgModule({
  declarations: formComponents,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  exports: formComponents,
})
export class FormSharedModule {}

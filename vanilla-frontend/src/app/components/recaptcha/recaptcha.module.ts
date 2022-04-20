import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  declarations: [RecaptchaComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [
    RecaptchaComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
})
export class RecaptchaKlevrModule {}

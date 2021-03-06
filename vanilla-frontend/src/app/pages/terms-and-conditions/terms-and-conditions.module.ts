import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { TermsAndConditionsRouting } from './terms-and-conditions-routing.module';

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [CommonModule, TermsAndConditionsRouting],
})
export class TermsAndConditionsModule {}

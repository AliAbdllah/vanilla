import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPolicyRouting } from './privacy-policy-routing.module';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, PrivacyPolicyRouting],
})
export class PrivacyPolicyModule {}

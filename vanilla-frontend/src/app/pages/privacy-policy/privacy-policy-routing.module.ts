import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [{ path: '', component: PrivacyPolicyComponent }];

export const PrivacyPolicyRouting = RouterModule.forChild(routes);

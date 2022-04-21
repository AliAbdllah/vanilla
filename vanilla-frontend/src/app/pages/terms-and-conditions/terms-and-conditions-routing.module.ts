import { RouterModule, Routes } from '@angular/router';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

const routes: Routes = [{ path: '', component: TermsAndConditionsComponent }];

export const TermsAndConditionsRouting = RouterModule.forChild(routes);

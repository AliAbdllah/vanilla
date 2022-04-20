import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookiesService } from 'src/app/service/cookies.service';

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss'],
})
export class RecaptchaComponent {
  constructor(private _cookieService: CookiesService) {}
  @Input() group: FormGroup;
  @Input() invisible = false;
  formControlName = 'recaptchaReactive';
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;

  public resolved(response): void {
    if (response === null) {
      this.onError(response);
    } else {
      this._cookieService.setItem('recaptcha', response);
      this.group.get(this.formControlName).setValue(true);
    }
  }

  public onError(response): void {
    if (response) {
      this.group.get(this.formControlName).reset();
    }
  }

  public ngOnInit(): void {
    this.group.addControl(
      this.formControlName,
      new FormControl(null, Validators.required)
    );
  }
}

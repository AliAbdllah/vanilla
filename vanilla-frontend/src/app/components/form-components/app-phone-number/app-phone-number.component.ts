import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { countryCodes } from '../dropdowns/countryCodes';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Observable, Subscription } from 'rxjs';
const phoneNumberUtil = PhoneNumberUtil.getInstance();
@Component({
  selector: 'app-phone-number',
  templateUrl: './app-phone-number.component.html',
  styleUrls: ['./app-phone-number.component.scss'],
})
export class AppPhoneNumberComponent implements OnInit, OnDestroy {
  @Input() public name;
  @Input() public group: UntypedFormGroup;
  @Input() public required: boolean;
  @Input() public requiredErrorMessage: string;
  @Input() public label;
  @ViewChild('select') public selectInput;
  @ViewChild('phoneInput') public phoneInput;
  public countryCodes = countryCodes;
  public selectedCountryCode: string = this.countryCodes[0].MobileCode;
  public regionCode;
  public phoneNumber: string;
  @Input() resetEvent: Observable<void>;
  private eventsSubscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.group.addControl(
      this.name,
      new UntypedFormControl(
        '',
        Validators.compose([
          Validators.pattern('[- +()0-9]{6,20}'),
          this.required ? Validators.required : null,
        ])
      )
    );

    this.eventsSubscription = this.resetEvent.subscribe(() => {
      this.selectInput.value = null;
      this.phoneInput.nativeElement.value = '';
    });
  }

  onCountryCodeChanged(event) {
    this.selectedCountryCode = event.value.MobileCode;
    this.regionCode = event.value.Code;
    if (this.selectedCountryCode && this.phoneNumber) {
      this.group
        .get(this.name)
        .setValue(this.selectedCountryCode + ' ' + this.phoneNumber);
    }
  }
  onChangePhoneNumber(event) {
    if (event.target.value) {
      this.phoneNumber = event.target.value;
      if (this.selectedCountryCode && event.target.value) {
        let validNumber = false;
        const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
          this.phoneNumber,
          this.regionCode
        );
        validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
        if (validNumber) {
          this.group
            .get(this.name)
            .setValue(this.selectedCountryCode + ' ' + event.target.value);
          this.group.get(this.name).markAsTouched();
        } else {
          this.group.get(this.name).setErrors({ pattern: true });
          this.group.get(this.name).markAsTouched();
        }
      }
    } else {
      this.group.get(this.name).setErrors({ required: true });
      this.group.get(this.name).markAsTouched();
    }
  }

  onPaste(event) {
    event.preventDefault();
  }

  validatePhoneNumber(evnt) {
    const event = evnt || window.event;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      var key = event.keyCode || event.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}

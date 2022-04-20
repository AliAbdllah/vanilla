import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as e from "express";
import { countryCodes } from "../dropdowns/countryCodes";

@Component({
  selector: "app-phone-number",
  templateUrl: "./app-phone-number.component.html",
  styleUrls: ["./app-phone-number.component.scss"],
})
export class AppPhoneNumberComponent implements OnInit {
  @Input() public name;
  @Input() public group: FormGroup;
  @Input() public required: boolean;
  @Input() public requiredErrorMessage: string;
  @Input() public label;
  public countryCodes = countryCodes;
  public selectedCountryCode: string = this.countryCodes[0].MobileCode;
  public phoneNumber: string;

  constructor() {}

  ngOnInit(): void {
    this.group.addControl(
      this.name,
      new FormControl(
        "",
        Validators.compose([
          Validators.pattern("[- +()0-9]{6,20}"),
          this.required ? Validators.required : null,
        ])
      )
    );
  }

  onCountryCodeChanged(event) {
    this.selectedCountryCode = event.value;
    if (this.selectedCountryCode && this.phoneNumber) {
      this.group
        .get(this.name)
        .setValue(this.selectedCountryCode + " " + this.phoneNumber);
    }
  }
  onChangePhoneNumber(event) {
    if (event.target.value) {
      this.phoneNumber = event.target.value;
      if (this.selectedCountryCode && event.target.value) {
        this.group
          .get(this.name)
          .setValue(this.selectedCountryCode + " " + event.target.value);
        this.group.get(this.name).markAsTouched();
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
    if (event.type === "paste") {
      key = event.clipboardData.getData("text/plain");
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
}

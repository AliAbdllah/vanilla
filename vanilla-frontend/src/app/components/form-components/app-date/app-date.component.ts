import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";

export const DateFormat = {
  display: {
    dateInput: "MM/DD/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "MM/DD/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-date",
  templateUrl: "./app-date.component.html",
  styleUrls: ["./app-date.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
  ],
})
export class AppDateComponent implements OnInit {
  @Input() public CustomBackGroundColor: boolean;
  @Input() public label: string;
  @Input() public type: string;
  @Input() public value: string;
  @Input() public required: boolean;
  @Input() public group: FormGroup;
  @Input() public name: string;
  @Input() public disabled: boolean = false;
  @Input() public icon: string;
  @Input() public svgIcon: string;
  @Input() public patternErrorMessage: string;
  @Input() public hint: string;
  @Input() public maxDate: string;
  @Input() public forceEnable: boolean;
  @Input() public inputReadonly = false;
  @Input() public minDate: string;
  @Input() public requiredErrorMessage;
  @Output()
  public changeEmitter: EventEmitter<any> = new EventEmitter<any>();
  public ngOnInit(): void {
    if (this.group) {
      this.group.addControl(
        this.name,
        new FormControl("", this.required ? Validators.required : null)
      );
    }
    this.group.get(this.name).enable();

    if (this.disabled) {
      this.group.get(this.name).disable();
    }
  }
  public onDateChange(): void {
    this.changeEmitter.emit();
  }
}

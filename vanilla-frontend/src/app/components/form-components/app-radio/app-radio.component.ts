import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-radio",
  templateUrl: "./app-radio.component.html",
  styleUrls: ["./app-radio.component.scss"],
})
export class AppRadioComponent implements OnInit {
  @Input() public label: string;
  @Input() public value: string;
  @Input() public required: boolean;
  @Input() public disabled: boolean = false;
  @Input() public group: FormGroup;
  @Input() public name: string;
  @Input() public icon: string;
  @Input() public svgIcon: string;
  @Input() public patternErrorMessage: string;
  @Input() public hint: string;
  @Input() public buttons: any[];
  @Output()
  public eventEmitter: EventEmitter<object> = new EventEmitter<object>();
  public ngOnInit(): void {
    if (this.group) {
      this.group.addControl(
        this.name,
        new FormControl("", Validators.required)
      );
      if (this.disabled) {
        this.group.get(this.name).disable();
      }
    }
  }
  public selectionChange(value: string | number, text: string): void {
    this.eventEmitter.emit({
      name: this.name,
      text: text,
      value: value,
      selectionChange: true,
    });
  }
}

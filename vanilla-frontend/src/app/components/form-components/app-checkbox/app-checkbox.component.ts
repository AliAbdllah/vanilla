import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-checkbox",
  templateUrl: "./app-checkbox.component.html",
  styleUrls: ["./app-checkbox.component.scss"],
})
export class AppCheckboxComponent implements OnInit {
  @Input() public group;
  @Input() public name;
  @Input() public required;
  @Input() public disabled;
  @Input() public label;
  @Input() public checkboxName;
  @Output()
  public eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  public ngOnInit(): void {
    if (this.group) {
      if (!this.group.get(this.name)) {
        this.group.addControl(
          this.name,
          new UntypedFormControl([], this.required ? Validators.required : null)
        );
      }
    }
    if (this.disabled) {
      this.group.get(this.name).disable();
    }
  }
  onChange(event) {
    this.eventEmitter.emit({
      checked: event.currentTarget.checked,
      name: this.checkboxName,
      group: this.group,
    });
  }
}

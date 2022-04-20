import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSelect } from "@angular/material/select";

@Component({
  selector: "app-select",
  templateUrl: "./app-select.component.html",
  styleUrls: ["./app-select.component.scss"],
})
export class AppSelectComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public label: string;
  @Input() public value: string;
  @Input() public validators: any;
  @Input() public isSelectClick = false;
  @Input() public withoutArrow = false;
  @Input() public disabled: boolean;
  @Input() public required: boolean;
  @Input() public group: FormGroup;
  @Input() public name: string;
  @Input() public options: any[];
  @Input() public selectedOption: any;
  @Input() public skipOptions: string[];
  @Input() public numbering = true;
  @Input() public enableSearch = true;
  @Input() public requiredErrorMessage: string;
  @Input() public showErrorOnDisabledStatus = false;
  public opened: boolean;
  public id = new Date().getTime();
  public initials: string;
  public focused: boolean;
  @ViewChild("select") public select: MatSelect;
  @Output()
  public eventEmitter: EventEmitter<Record<string, unknown>> = new EventEmitter<
    Record<string, unknown>
  >();

  @Output() selectInit = new EventEmitter<number>();
  private backupOptions: any[];

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  ngOnDestroy(): void {
    this.group.removeControl(this.name);
  }

  public ngOnInit(): void {
    if (this.group) {
      this.group.addControl(
        this.name,
        new FormControl("", Validators.required)
      );

      if (this.disabled) {
        this.group.get(this.name).disable();
      }
      this.selectInitialValues();
      this.selectInit.emit(this.id);
      if (this.selectedOption) {
        this.group.get(this.name).setValue(this.selectedOption);
      }
    }
  }

  public ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public ngOnChanges(changes: any): void {
    if ("options" in changes || "disabled" in changes) {
      this.selectInitialValues();
      if (changes?.disabled?.currentValue) {
        this.group.get(this.name)?.disable();
      } else {
        this.group.get(this.name)?.enable();
      }
      if (changes?.options?.currentValue && changes?.options?.previousValue) {
        const currentValue = changes.options.currentValue;
        const previousValue = changes.options.previousValue;
        if (currentValue instanceof Array && previousValue instanceof Array) {
          const newVal = currentValue
            .map((val1: any) => val1.text)
            .find((val) => {
              return (
                previousValue.map((val2: any) => val2.text).indexOf(val) < 0
              );
            });
          if (newVal) {
            this.selectionChange({ value: { text: newVal } });
          }
        }
      }
    }
  }

  public selectionChange(event: any): void {
    this.eventEmitter.emit({
      name: this.name,
      text: event.value.text ? event.value.text : "",
      value: event.value.value,
      data: event.value.data,
      selectionChange: true,
    });
  }

  public selectInitialValues(): void {
    if (
      this.group?.get(this.name)?.value &&
      typeof this.group.get(this.name).value === "string"
    ) {
      for (const option of this.options) {
        if (option.value === this.group.get(this.name).value) {
          this.group.get(this.name).setValue(option);
          this.group.get(this.name).markAsTouched();
          this.eventEmitter.emit({
            name: this.name,
            value: option.value,
            data: option.data,
            selectionChange: false,
          });
          break;
        }
      }
    }
  }

  public openedChange(event: any, opened: boolean): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.group.get(this.name).enabled) {
    }
  }

  public onKey(value: string): void {
    const filterd = this.backupOptions.filter((option) => {
      return option.text.toLowerCase().includes(value.toLowerCase());
    });
    this.options = filterd;
  }
  public createInititals(name: string): string {
    let initials = "";
    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === " ") {
        continue;
      }
      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);
        if (initials.length === 2) {
          break;
        }
      }
    }
    if (initials === "") {
      return name.charAt(0);
    }
    return initials;
  }
}

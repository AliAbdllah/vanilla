import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './app-text-area.component.html',
  styleUrls: ['./app-text-area.component.scss'],
})
export class AppTextAreaComponent implements OnInit {
  @Input() public label = '';
  @Input() public value: string;
  @Input() public required: boolean;
  @Input() public disabled: boolean;
  @Input() public numberOfLettersAllowed: number;
  @Input() public group: UntypedFormGroup;
  @Input() public name: string;
  @Input() public icon: string;
  @Input() public svgIcon: string;
  @Input() public appearance: string;
  @Input() public hint: string;
  @Input() public patternErrorMessage: string;
  @Input() public maxLength: number;
  @Input() public countRemainingWords: number;
  @Input() public requiredErrorMessage: string;
  @Input() public minRows: number;
  @Input() public maxRows: number;
  public remainingWords: number;
  public ngOnInit(): void {
    if (this.group) {
      this.group.addControl(
        this.name,
        new UntypedFormControl('', this.required ? Validators.required : null)
      );
    }
    if (this.disabled) {
      this.group.get(this.name).disable();
    }
    this.remainingWords = this.countRemainingWords;
    if (this.maxLength) {
      this.group.get(this.name).valueChanges.subscribe((newVal) => {
        if (newVal.split(/\s+/).length > this.countRemainingWords) {
          this.group.controls[this.name].setValue(
            newVal
              .split(/\s+/)
              .slice(0, this, this.countRemainingWords)
              .join(' ')
          );
        }
      });
    }
  }

  public wordCounter() {
    this.remainingWords = this.group.controls[this.name].value
      ? this.countRemainingWords -
        this.group.controls[this.name].value.split(/\s+/).length
      : this.countRemainingWords;
    if (this.remainingWords <= 0) {
      this.remainingWords = 0;
      const original = this.group.controls[this.name].value.split(/\s+/);
      const newWords = original.slice(0, this.countRemainingWords).join(' ');
      this.group.controls[this.name].setValue(newWords);
    }
  }

  public onKeyDown(event: any): void {
    if (
      this.numberOfLettersAllowed &&
      this.group.get(this.name).value &&
      String(this.group.get(this.name).value).length >
        this.numberOfLettersAllowed
    ) {
      const keys = ['Backspace'];
      if (keys.indexOf(event.key) < 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
}

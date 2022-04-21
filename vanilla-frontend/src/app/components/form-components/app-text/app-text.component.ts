import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-text',
  templateUrl: './app-text.component.html',
  styleUrls: ['./app-text.component.scss'],
})
export class AppTextComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  @Input() public id: number;
  @Input() public label: string;
  @Input() public value: string;
  @Input() public forceMaxLength = false;
  @Input() public onlyNumbersAllowed = false;
  @Input() public required: boolean;
  @Input() public disabled: boolean;
  @Input() public group: FormGroup;
  @Input() public name: string;
  @Input() public isEmail: boolean;
  @Input() public maxLength: number;
  @Input() public maxLengthNumber: number;
  @Input() public icon: string;
  @Input() public svgIcon: string;
  @Input() public patternErrorMessage: string;
  @Input() public requiredErrorMessage: string;
  @Input() public hint: string;
  @Input() public hasSuffix = false;
  @Input() public readOnly = false;
  @Input() public SpecialCharactersAllowed = true;
  @Input() public isSpaceAllowed = false;
  @Input() public onInputChangeCheck = false;

  @Output()
  public inputChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  public ngOnInit(): void {
    if (this.group) {
      this.group.addControl(
        this.name,
        new FormControl('', this.required ? Validators.required : null)
      );

      if (this.isEmail) {
        this.group.get(this.name).setValidators([
          // Validators.email,
          Validators.pattern(/\S+@\S+\.\S+/),
        ]);
      }
    }
    if (this.disabled) {
      this.group.get(this.name).disable();
    }
  }
  public ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  public onPaste(event: any): void {}

  public onKeyUp(event: any): void {
    if (this.onInputChangeCheck) {
      this.inputChanged.emit(event);
    }
  }

  public onKeyDown(event: any): void {
    // function to check the detection
    const ev = event || window.event; // Event object 'ev'
    const key = ev.which || ev.keyCode; // Detecting keyCode

    // Detecting Ctrl
    const ctrl = ev.ctrlKey ? ev.ctrlKey : key === 17 ? true : false;

    // If key pressed is V and if ctrl is true.
    if (key == 86 && ctrl && this.onlyNumbersAllowed && !this.isEmail) {
      // Ctrl+V is pressed  dont preventDefault let paste event fire
      return;
    } else if (!this.isEmail) {
      if (this.onlyNumbersAllowed) {
        const keys = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '+',
          'Backspace',
          'Tab',
        ];
        if (keys.indexOf(event.key) < 0) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
      if (
        this.forceMaxLength &&
        this.maxLength &&
        this.group.get(this.name).value.length > this.maxLength
      ) {
        this.group
          .get(this.name)
          .setValue(
            this.group.get(this.name).value.substring(0, this.maxLength)
          );
        event.preventDefault();
        event.stopPropagation();
      }
      this.DisplayErrorOnSpecialCharacters(event, event.key);
    }
  }

  public DisplayErrorOnSpecialCharacters(event: any, key: any): void {
    if (!this.SpecialCharactersAllowed) {
      const regex = new RegExp('^[a-zA-Z0-9 .]*$');
      if (!regex.test(key)) {
        if (this.isSpaceAllowed && event.keyCode === 32) {
          return;
        } else {
          event.preventDefault();
        }
      }
      return;
    }
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

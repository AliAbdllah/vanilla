import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './app-file-upload.component.html',
  styleUrls: ['./app-file-upload.component.scss'],
})
export class AppFileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() public group: UntypedFormGroup;
  @Input() public required;
  @Input() public label: string;
  @Input() public size;
  @Input() public accepts;
  @Input() public fileControlName;
  @Input() public requiredErrorMessage: string;
  public fileName = '';
  @Output()
  public eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.group) {
      if (this.required) {
        this.group.addControl(
          this.fileControlName,
          new UntypedFormControl('', Validators.required)
        );
      } else {
        this.group.addControl(
          this.fileControlName,
          new UntypedFormControl('', null)
        );
      }
    }
    this.fileName = this.label;
  }
  onFileChange(event, file) {
    if (event?.target?.files[0]?.name) {
      this.fileName = event?.target?.files[0]?.name;
    }
    this.eventEmitter.emit({
      event: event,
      fileName: file,
    });
  }

  reset() {
    this.fileName = '';
  }
}

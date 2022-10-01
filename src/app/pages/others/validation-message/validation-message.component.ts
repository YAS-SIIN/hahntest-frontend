import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'; 
import { SharedService } from '../../../services/shared/shared.service'; 
import { HttpErrorResponse } from '@angular/common/http';
  
@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html'
})
export class ValidationMessageComponent implements OnInit {
  @Input() control: AbstractControl | undefined;
  @Input() fieldDisplayName: string = "";
  @Input() rules: { [key: string]: string; } = {"" : ""};

  get message(): string {
    
    return this.control?.hasError('required')
      ? `${this.fieldDisplayName} is required.`
      : this.control?.hasError('pattern')
      ? `${this.fieldDisplayName} format is not correct.`
      : this.control?.hasError('email')
      ? `${this.fieldDisplayName} format is not correct.`
      : this.control?.hasError('minlength')
      ? `${this.fieldDisplayName} should be more than ${
          this.control?.errors?.['minlength'].required
        } character.`
      : this.control?.hasError('maxlength')
      ? `${this.fieldDisplayName} should be less than ${
          this.control?.errors?.['maxlength'].requiredLength
        } character. `
      : this.control?.hasError('min')
      ? `${this.fieldDisplayName} should be more than ${
          this.control?.errors?.['min'].requiredLength
        } character.`
      : this.control?.hasError('max')
      ? `${this.fieldDisplayName} should be less than ${
          this.control?.errors?.['max'].requiredLength
        } character.`
      : this.hasRule()
      ? this.findRule()
      : this.control?.hasError('model')
      ? `${this.control?.errors?.['model'].messages[0]}`
      : this.control?.errors?.['modelStateError'].error[0].includes('required')
      ? `${this.fieldDisplayName} is required`
      : this.control?.errors?.['modelStateError'].error[0].includes('pattern')
      ? `${this.fieldDisplayName} format is not correct.`
      : this.control?.errors?.['modelStateError'].error[0].includes('email')
      ? `${this.fieldDisplayName} format is not correct.`
      : this.control?.errors?.['modelStateError'].error[0].includes('minlength')
      ? `The value entered is less than the limit`
      : this.control?.errors?.['modelStateError'].error[0].includes('maxlength')
      ? `The value entered is more than the limit`
      : this.control?.errors?.['modelStateError'].error[0].includes('min')
      ? `The value entered is less than the limit`
      : this.control?.errors?.['modelStateError'].error[0].includes('max')
      ? `The value entered is more than the limit`
      : this.control?.errors?.['modelStateError'].error[0].includes('regular expression')
      ? `format is not correct.`
      : this.control?.errors?.['modelStateError'].error[0].includes('model')
      ? `${this.control?.errors?.['model'].error[0]}`
      : '';
  }
  constructor() {}

  private hasRule() {
    
    return (
      this.rules &&
      Object.keys(this.control?.errors || []).some(ruleKey =>
        this.rules[ruleKey] ? true : false
      )
    );
  }

  private findRule(): string {
    
    let message = '';
    Object.keys(this.control?.errors || []).forEach(ruleKey => {
      if (this.rules[ruleKey]) {
        message += `${this.rules[ruleKey]} `;
      }
    });

    return message;
  }

  ngOnInit(): void {}
}
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioOption } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

  value: any
  onChange: any;

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value
    this.onChange(this.value)
  }

  //method implemented by the interface
  writeValue(obj: any): void {
    this.value = obj
  }
  //method implemented by the interface
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  //method implemented by the interface
  registerOnTouched(fn: any): void {
  }
  //method implemented by the interface
  setDisabledState?(isDisabled: boolean): void {
  }

}

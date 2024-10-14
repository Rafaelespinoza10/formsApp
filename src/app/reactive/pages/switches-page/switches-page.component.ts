import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm: FormGroup
  public isGenderMaleSelected :boolean = false;
  public isGenderFemaledSelected: boolean = false;
event: any;

  constructor(private formBuilder: FormBuilder){
    this.myForm = this.formBuilder.group({
      gender: ['M', [Validators.required]],
      wasNotifications: [true, [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]],
    });
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
//
  onChangeOption(event:any){
    if(event.target.checked && event.target.defaultValue === 'M'){
          this.isGenderFemaledSelected = true;
          this.isGenderMaleSelected = false;
    }else if(event.target.checked && event.target.defaultValue === 'F'){
          this.isGenderFemaledSelected = false;
          this.isGenderMaleSelected = true;
    }
  }

  isValidField(field: string): boolean |null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
 }

 getFieldError(field: string):string | null{
  if(!this.myForm.controls[field]) return null;
  const errors = this.myForm.controls[field].errors || {};
  for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';
        case 'requiredtrue':
            return 'Debe de aceptar las condiciones de uso';
      }
  }
  return null;
}

}

import { Injectable } from '@angular/core';
import { AbstractControl, EmailValidator, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})

export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


 cantBeStrider = ( control: FormControl ):ValidationErrors | null  =>{
    const value:string = control.value.trim().toLowerCase();
    if(value  === 'strider'){
      return{
        noStrider: true,
      }
    }
    return null
  }

  isValidField( field: string, form: FormGroup ): boolean | null{
      return form.controls[field].errors && form.controls[field].touched;
  }

  isFieldOneEqualsFieldTwo( fieldOne: string, fieldTwo: string){
    return ( formGroup: AbstractControl ):ValidationErrors | null  =>{

      const fieldOneValue = formGroup.get(fieldOne)?.value || '';
      const fieldTwoValue = formGroup.get(fieldTwo)?.value || '';

      if(fieldOneValue !== fieldTwoValue){
        formGroup.get(fieldTwo)?.setErrors({ notEqual: true });
        return{ noEqual: true}
      }
      formGroup.get(fieldTwo)?.setErrors(null);

      return null;
    }
  }




}

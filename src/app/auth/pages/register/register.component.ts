import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators  from '../../../shared/validators/validations.functions';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email.service';

@Component({
  selector: 'app-pages',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {

  public myForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private validatorSerive: ValidatorsService,
              private EmailValidator: EmailValidatorService
  ){
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern( this.validatorSerive.firstNameAndLastnamePattern)]],
      email: ['', [Validators.required, Validators.pattern( this.validatorSerive.emailPattern )], [new EmailValidatorService()]],
      // email: ['', [Validators.required, Validators.pattern( this.validatorSerive.emailPattern )], [ this.EmailValidator ]],
      userName : ['',[ Validators.required, this.validatorSerive.cantBeStrider ]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required]],
    },
      {
        validators:[
          this.validatorSerive.isFieldOneEqualsFieldTwo('password', 'confirmPassword'),
        ]
      });
  }

  onSubmit(){
    this.myForm.markAsTouched();
  }


  isValidField(field: string) {
    //!OBTENER  Validacion desde un servicio
    this.validatorSerive.isValidField(field, this.myForm);
 }



}

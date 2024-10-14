import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


//supongamos que viene un valor del backend
const RSLOGIX4000 = {
  name: 'RsxLogix4000',
  price: 123000,
  inStorage: 5,
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  // public myForm : FormGroup = new FormGroup({
  //     name: new FormControl(''), //validaciones sincronas, validaciones asincronas
  //     price: new FormControl(0), //validaciones sincronas, validaciones asincronas
  //     inStorage:  new FormControl(0), //validaciones sincronas, validaciones asincronas
  // })

  //Form Builder
    public myForm: FormGroup;

    constructor(private formBuilder: FormBuilder){
        this.myForm = this.formBuilder.group({
          name: ['',[ Validators.required, Validators.minLength(3) ]],
          price: [0,[ Validators.required, Validators.min(1) ]],
          inStorage: [0, [Validators.required, Validators.min(1) ]],
        });
    }

    ngOnInit(): void {
  //    this.myForm.reset( RSLOGIX4000 );
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
            case 'min':
                return 'El precio debe de ser mayor a cero';
            case 'minlength':
                return `Este campo debe de contener minimo ${errors['minlength'].requiredLenght} caracteres`;

          }
      }

      return null;
     }

    onSave(): void{
      if(this.myForm.invalid) {
        this.myForm.markAllAsTouched();
        return
      };

      console.log(this.myForm.value)

      this.myForm.reset({price: 0, inStorage: 0}); // reestablece los valorees una vez que el form sea valid
    }

}

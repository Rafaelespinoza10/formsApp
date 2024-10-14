import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup;
  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder){
     this.myForm  = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.formBuilder.array([
          ['Metal Gear', Validators.required],
          ['Gears of War', Validators.required],
        ])
    });
  }


  public get favoriteGames() : FormArray {
    return this.myForm.get('favoriteGames') as FormArray
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

  isValidFieldInArray(formArray: FormArray, index: number): boolean|null{
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }


  onAddToFavorites():void{
      if(this.newFavorite.invalid) return;
      const newGame = this.newFavorite.value;
 //     this.favoriteGames.push( new FormControl(newGame, [Validators.required]));
      this.favoriteGames.push(this.formBuilder.control(newGame, [Validators.required]));
      this.newFavorite.reset();
  }

  onDeleteField(index: number):void{
      this.favoriteGames.removeAt(index);
  }

  onSubmit():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }
}

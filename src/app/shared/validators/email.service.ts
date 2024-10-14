import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class EmailValidatorService implements AsyncValidator{

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);

    // return this.http.get<string>(`https://miservicio.com`)

    const httpCallObservable = new Observable<ValidationErrors | null >( (subscriber) => {
        console.log({email});
        //simulacion de un backend
        if( email === 'fenando@google.com'){
          subscriber.next({ emailTaken: true })
          subscriber.complete();  // se completa el subscriber
          //return;
        }
        subscriber.next(null); // el email no esta en el backend
        subscriber.complete();

      })
      .pipe(
        delay(2000)   //retardamos la respuesta 2 segundos
      )

    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log(email);

  //   return of({
  //     emailTaken: true,
  //   })
  // }


  // return this.http.get<any[]>(`http://localhost3000/users?q=${email}`)
  //   .pipe(
  //     delay(3000),
  //       map(
  //         response => {
  //           return (response.length === 0)
  //               ? null
  //               :{emailTaken: true}
  //         }
  //       )

  //   )

}

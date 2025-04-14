import { inject, Inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmplyoeeService } from "../service/emplyoee.service";
 import { loadEmployee, loadEmployeeFail, loadEmployeeSuccess } from "./Employee.action";
import { catchError, exhaustMap, map, of } from "rxjs";
@Injectable()
export class empeffect{
    // constructor(private actions$:Actions,private service:EmplyoeeService){

    // }
    actions$=inject(Actions);
    service=inject(EmplyoeeService)
    


    loadEmployee$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadEmployee),
          exhaustMap(() =>
            this.service.Getall().pipe(
              map((data) => loadEmployeeSuccess({ list: data })),
              catchError((err) =>
                of(loadEmployeeFail({ error: err.message })) 
              )
            )
          )
        )
      );
}
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EmplyoeeService } from '../service/emplyoee.service';
// import { loadEmployee, loadEmployeeSuccess, loadEmployeeFail } from './employee.action'; // ✅ make sure these are correct
// import { exhaustMap, map, catchError } from 'rxjs/operators'; // ✅ from 'rxjs/operators'
// import { of } from 'rxjs'; // ✅ this needs to be imported separately

// @Injectable()
// export class Empeffect {
//   constructor(
//     private actions$: Actions,
//     private service: EmplyoeeService
//   ) {}

//   loadEmployee$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadEmployee),
//       exhaustMap(() =>
//         this.service.Getall().pipe(
//           map((data) => loadEmployeeSuccess({ list: data })),
//           catchError((err) => of(loadEmployeeFail({ error: err.message })))
//         )
//       )
//     )
//   );
//   export const loadEmployee = createAction('[Employee] Load');
// export const loadEmployeeSuccess = createAction(
//   '[Employee] Load Success',
//   props<{ list: Employee[] }>()
// );
// export const loadEmployeeFail = createAction(
//   '[Employee] Load Fail',
//   props<{ error: any }>()
// );
// }

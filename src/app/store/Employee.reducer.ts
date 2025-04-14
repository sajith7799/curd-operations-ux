// import { createReducer, on, State } from "@ngrx/store";
// import { employeestate } from "./Employee.state";
//  import { loadEmployee, loadEmployeeFail, loadEmployeeSuccess } from "./Employee.action";
// import { Action } from "rxjs/internal/scheduler/Action";


// const _employeeReducer= createReducer(employeestate,
    
//     on(loadEmployeeSuccess, (state, action) => ({
//         ...state,
//         list: action.list,
//         errormessage: ''
//       })),
//       on(loadEmployeeFail, (state, action) => ({
//         ...state,
//         list: [],
//         errormessage: action.error // Make sure `error` is defined in the action
//       }))
// )
// export function employeeReducer(state:any,action:any){
//     return employeeReducer(state, action)
// }
import { createReducer, on } from '@ngrx/store';
import { loadEmployee, loadEmployeeFail, loadEmployeeSuccess } from "./Employee.action";
import { employeestate } from "./Employee.state";

const initialState: typeof employeestate = {
  list: [],
  errormessage: ''
};

export const employeeReducer = createReducer(
  initialState, // ✅ use this, not employeeReducer
  on(loadEmployeeSuccess, (state, action) => ({
    ...state,
    list: action.list,
    errormessage: ''
  })),
  on(loadEmployeeFail, (state, action) => ({
    ...state,
    list: [],
    errormessage: action.error
  }))
);
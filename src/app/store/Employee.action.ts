import { createAction, props } from '@ngrx/store';
import { employee } from "../model/employee";

// Action Constants (optional but common)
export const LOAD_EMPLOYEE = '[Employee] Load Employees';
export const LOAD_EMPLOYEE_SUCCESS = '[Employee] Load Employees Success';
export const LOAD_EMPLOYEE_FAIL = '[Employee] Load Employees Fail';
export const loadEmployee = createAction(LOAD_EMPLOYEE);

export const loadEmployeeSuccess = createAction(
  LOAD_EMPLOYEE_SUCCESS,
  props<{ list:  employee[] }>()
);

export const loadEmployeeFail = createAction(
  LOAD_EMPLOYEE_FAIL,
  props<{ error: any }>() // it's a good idea to pass error info
);
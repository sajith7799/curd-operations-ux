import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { Employeemodel } from "./Employee.model";

const getEmployeestate=createFeatureSelector<Employeemodel>('emp')
export const getEmplist=createSelector(getEmployeestate,(State)=>{
    return State.list;
})
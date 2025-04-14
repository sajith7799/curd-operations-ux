import { Component, OnDestroy, OnInit } from '@angular/core';
import{MatCardModule}from '@angular/material/card';
import{MatButtonModule}from '@angular/material/button';
import{MatDialog, MatDialogModule}from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { AddemployeeComponent } from '../addemployee/addemployee.component';
import { employee } from '../../model/employee';
import{MatTableDataSource, MatTableModule}from '@angular/material/table';
import { EmplyoeeService } from '../../service/emplyoee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadEmployee } from '../../store/Employee.action';
import { getEmplist } from '../../store/Employee.selector';
@Component({
  selector: 'app-employee',
  imports: [MatCardModule,MatButtonModule,MatDialogModule,MatTableModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit,OnDestroy {

  empList:employee[]=[]
  dataSource!:MatTableDataSource<employee>;
  displayedColumns: string[] = ['id', 'name', 'doj','role' ,'salary', 'actions'];
   subscription=new Subscription()



  constructor(private dialog:MatDialog,private service:EmplyoeeService
    ,private store:Store
  ){

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  this.Getallemployee();
  }
  Getallemployee(){
     let sub=this.service.Getall().subscribe(item=>{
      this.empList=item;
      this.dataSource=new MatTableDataSource(this.empList)
    })
    this.subscription.add(sub)
    // this.store.dispatch(loadEmployee())
    // this.store.select(getEmplist).subscribe(item=>{
    //   this.empList=item;
    //  this.dataSource=new MatTableDataSource(this.empList)
    // })
  }
  addemployee(){
  this.openpopup(0);
  }
 
  deleteemployee(empid:number){
    if(confirm('are sure?')){
      let sub=this.service.delete(empid).subscribe(item=>{
        this.Getallemployee()
      })
      this.subscription.add(sub)
    }
  }
  editemployee(empid:number){
this.openpopup(empid);
  }
  openpopup(empid:number){
    this.dialog.open(AddemployeeComponent,{
      width:'50%',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data:{
        'code':empid,
      }
  
     }).afterClosed().subscribe(o=>{
      this.Getallemployee();
     });
  }
}

import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { employee } from '../../model/employee';
import { EmplyoeeService } from '../../service/emplyoee.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-addemployee',
  imports: [MatCardModule, ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatButtonModule,MatIconModule,MatDatepickerModule,MatSelectModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent implements OnInit{
  title = 'Add Employee';
  dailodata:any;
  isedit=false;

  constructor(private service:EmplyoeeService,private ref:MatDialogRef<AddemployeeComponent> 
    ,private toaster:ToastrService, @Inject(MAT_DIALOG_DATA)public data:any){

  }
  ngOnInit(): void {
  this.dailodata=this.data;
  if(this.dailodata.code>0){
    this.title="Edit Employee";
    this.isedit=true;
    this.service.Get(this.dailodata.code).subscribe(item=>{
      let _data=item;
      if(_data!=null){
        this.empForm.setValue({
          id: _data.id,
          name: _data.name,
          doj: _data.doj,
          role: _data.role,
          salary:_data.salary.toString(), 
        })
      }
    })
  }
  }
  
  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
  })

  Saveemployee(){
if(this.empForm.valid){
// console.log(this.empForm.value)
let _data:employee={
  id: this.empForm.value.id as number,
  name: this.empForm.value.name as string,
  doj: new Date(this.empForm.value.doj as Date),
  role: this.empForm.value.role as string,
  salary: this.empForm.value.id as number,
}
if(this.isedit){
  this.service.Update(_data).subscribe(item=>{
    // alert("saved")
    this.toaster.success('saved successfully','updated')
    this.closepopup();
  })
}
else{
  this.service.create(_data).subscribe(item=>{
    // alert("saved")
    this.toaster.success('saved successfully','created')
    this.closepopup();
  })
}

}

  }
  closepopup(){
    this.ref.close();
    }
}

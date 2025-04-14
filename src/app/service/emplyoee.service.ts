import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmplyoeeService {

  apiurl="http://localhost:3000/employee"
  constructor(private http:HttpClient) { }

  Getall(){
    return this.http.get<employee[]>(this.apiurl)
  }

  Get(empid:number){
    return this.http.get<employee>(this.apiurl+'/'+empid)
  }

  create(data:employee){
    return this.http.post(this.apiurl,data)
  }
  Update(data:employee){
    return this.http.put(this.apiurl+'/'+data.id ,data);
  }
  delete(empid:number){
    return this.http.delete(this.apiurl+'/'+empid);
  }
}

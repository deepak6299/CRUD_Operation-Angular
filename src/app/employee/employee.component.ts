import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';



import {employe} from './employee.model'
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  // purpose of using,if we click on btn "Add Details" in form only "cancel" and "add+" btn should be shown
  // if we click on btn "Edit", in forms only "cancel" and "update btn should be shown" btn should be shown
showAdd !:boolean;
showUpdate !:boolean;
  clickAddEmployee(){ //we have to call this method in button in Add Details
this.showAdd=true;  //in add+ button,you have to write *ngIf="showAdd" 
this.showUpdate=false; //In edit button,you have to write *ngIf="showUpdate" 
  }


formvalue!:FormGroup;
// we hahe to create an object
employeObj:employe=new employe();
  employeeAll: any;
  


constructor(private formbuilder:FormBuilder, private api:ApiService){}

ngOnInit():void{
  this.formvalue=this.formbuilder.group({
    firstName:[''],
    lastName:[''],
    email:[''],
    phone:[''],
    
  })
  this.getEmplyees();
}

// creating a method
postEmployees(){
  this.employeObj.firstName=this.formvalue.value.firstName;
  this.employeObj.lastName=this.formvalue.value.lastName;
  this.employeObj.email=this.formvalue.value.email;
  this.employeObj.phone=this.formvalue.value.phone;
 
  // let we have to post the data
  // we have fire an api
  this.api.postEmploye(this.employeObj).subscribe(res=>{
    console.log(res);
    alert("employee added successfully")
    this.formvalue.reset();
  },
   err=>{
    alert("something went wrong")
  }
  )
}

// we have to fire a method (get)
getEmplyees(){
  this.api.getEmploye().subscribe(res=>{
    this.employeeAll=res;
  })
}

// we have to fire a method(delete)

deleteEmployees(data:any){
 this.api.deleteEmploye(data.id).subscribe(res=>{
  alert("Records are deleted!!!")
  this.employeeAll();
 })
}


// here we have to fire edit method
onEdit(data:any){           //write in edit btn (click)="onEdit(data)"
  this.showAdd=false;
this.showUpdate=true;
  this.employeObj.id=data.id;
  this.formvalue.controls['firstName'].setValue(data.firstName);
  this.formvalue.controls['lastName'].setValue(data.lastName);
  this.formvalue.controls['email'].setValue(data.email);
  this.formvalue.controls['phone'].setValue(data.phone);
}

updateEmployees(){
  this.employeObj.firstName=this.formvalue.value.firstName;
  this.employeObj.lastName=this.formvalue.value.lastName;
  this.employeObj.email=this.formvalue.value.email;
  this.employeObj.phone=this.formvalue.value.phone;

  // we have to fire api here
  this.api.updateEmploye(this.employeObj,this.employeObj.id).subscribe(res=>{
    alert("record updated successfully!!!");
    this.formvalue.reset();
    this.employeeAll();
  })
}
}

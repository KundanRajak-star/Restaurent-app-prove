import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup
  restaurentModelObj:RestaurentData=new RestaurentData
  allRestaurentData: any;
  showAdd!:boolean
  showbtn!:boolean
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']

    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true
    this.showbtn=false
  }
// now we subscribe
addResto(){
  this.restaurentModelObj.name=this.formValue.value.name;
  this.restaurentModelObj.email=this.formValue.value.email;
  this.restaurentModelObj.mobile=this.formValue.value.mobile;
  this.restaurentModelObj.address=this.formValue.value.address;
  this.restaurentModelObj.service=this.formValue.value.service;
  
  this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
    console.log(res);
    alert("Restaurent Records Added Successfully Anand !!")
  //  clear  fill form data 0
  let ref=document.getElementById('clear');
  ref?.click();

  this.formValue.reset()
  this.getAllData()
  },
  err=>{
    alert("Something Went wrong Anand")
  })

}
getAllData(){
  this.api.getRestaurant().subscribe(res=>{
    this.allRestaurentData=res
  })
  
}
// delete records

deleteResto(data:any){
  this.api.deleteRestaurant(data.id).subscribe(res=>{
   
    alert("Restaurent Records Deleted successfully")
    this.getAllData();
  })
}  
onEditResto(data:any){
  this.showAdd=false
  this.showbtn=true
  this.restaurentModelObj.id=data.id
  this.formValue.controls['name'].setValue(data.name)
  this.formValue.controls['email'].setValue(data.email)
  this.formValue.controls['mobile'].setValue(data.mobile)
  this.formValue.controls['address'].setValue(data.address)
  this.formValue.controls['services'].setValue(data.services)
  
}
updateResto(){

  this.restaurentModelObj.name=this.formValue.value.name;
  this.restaurentModelObj.email=this.formValue.value.email;
  this.restaurentModelObj.mobile=this.formValue.value.mobile;
  this.restaurentModelObj.address=this.formValue.value.address;
  this.restaurentModelObj.service=this.formValue.value.service;
  this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
    alert("Restaurent Records Successfully")
    let ref=document.getElementById('clear');
  ref?.click();

  this.formValue.reset()
  this.getAllData()
  })
}


}










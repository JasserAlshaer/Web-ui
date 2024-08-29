import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { SignupDTO } from 'src/app/dtos/SignupDTO';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  input:SignupDTO= new SignupDTO()
  constructor(public router:Router,public backend:MainService,
    public spinner: NgxSpinnerService,public toastr : ToastrService
  ){
    
  }
  CreateNewAccount(){
    if(this.input.firstName == undefined || this.input.firstName == ''){
      this.toastr.warning('Please Enter User first name')
      return;
    }
    if(this.input.lastName == undefined || this.input.lastName == ''){
      this.toastr.warning('Please Enter User  last name')
      return;
    }
    if(this.input.password == undefined || this.input.password == ''){
      this.toastr.warning('Please Enter Password')
      return;
    }
    if(this.input.email == undefined || this.input.email == ''){
      this.toastr.warning('Please Enter Email')
      return;
    }
    if(this.input.phone == undefined || this.input.phone == ''){
      this.toastr.warning('Please Enter Phone')
      return;
    }
    this.spinner.show()
    this.backend.Register(this.input).subscribe(res=>{
      this.spinner.hide()
      this.toastr.success('New Account has been Created')
      this.router.navigate(['/'])
    },err=>{
      this.spinner.hide()
      this.toastr.error('Failed To Create Account')
    })
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { LoginDTO } from 'src/app/dtos/LoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  input : LoginDTO = new LoginDTO()
  constructor(public router:Router,public backend:MainService,
    public spinner: NgxSpinnerService,public toastr : ToastrService
  ){
    
  }
  Login(){
    if(this.input.userName == undefined){
      this.toastr.warning('Please Enter User name')
      return;
    }
    if(this.input.password == undefined){
      this.toastr.warning('Please Enter Password')
      return;
    }
    if(this.input.userName == ''){
      this.toastr.warning('User name Colud not be empty')
      return;
    }

      this.spinner.show()
      this.backend.Login(this.input).subscribe(res=>{
        this.spinner.hide()
        localStorage.setItem('isLoggedIn','true')
        localStorage.setItem('token',res)
        let data: any = jwtDecode(res);
        localStorage.setItem('userId',data.UserId)
        localStorage.setItem('email',data.Email)
        localStorage.setItem('conservationId',data.ConservationId)
        this.router.navigate(['/chats'])
      },err=>{
        this.spinner.hide()
        this.toastr.error('Wrong User name / Password')
      })
  }
}

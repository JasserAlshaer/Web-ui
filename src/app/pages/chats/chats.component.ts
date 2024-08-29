import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { AboutUsDialogComponent } from 'src/app/dialogs/about-us-dialog/about-us-dialog.component';
import { FetchMessageDTO } from 'src/app/dtos/FetchMessageDTO';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  messages :FetchMessageDTO[]= [
    
  ];

  newMessage = '';

  constructor(public dialog: MatDialog, public router: Router, public backend: MainService,
    public spinner:NgxSpinnerService,public toastr:ToastrService
  ) { }

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const conservationId = localStorage.getItem('conservationId');

    if (!isLoggedIn || !token || !userId || !conservationId) {
      this.router.navigate(['/']);
    }else{
      this.spinner.show()
      const consId = parseInt(conservationId)
      this.backend.getMessageListByConservationId(consId).subscribe(res=>{
        this.spinner.hide()
        this.messages = res
      },err=>{
        this.spinner.hide()
      })
    }
  }
  sendMessage() {
    if (this.newMessage.trim()) {
      const conservationId = localStorage.getItem('conservationId');
      if(conservationId != null){
        const consId = parseInt(conservationId)
        this.backend.executeCommand(this.newMessage,consId).subscribe(res=>{
          this.spinner.hide()
          this.loadMessages()
        },err=>{
          this.spinner.hide()
          this.loadMessages()
        })
      }

    }
  }

  loadMessages(){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const conservationId = localStorage.getItem('conservationId');
    if ( !conservationId) {
      this.router.navigate(['/']);
    }else{
      this.spinner.show()
      const consId = parseInt(conservationId)
      this.backend.getMessageListByConservationId(consId).subscribe(res=>{
        this.spinner.hide()
        this.messages = res
      },err=>{
        this.spinner.hide()
      })
    }
  }

  scrollToBottom() {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  logout() {
    console.log('Logout clicked');
    
    const userEmail = localStorage.getItem('email')
    if (userEmail != null){
      this.spinner.show()
      this.backend.logout(userEmail).subscribe(res => {
        this.spinner.hide()
        this.toastr.info('We will Miss You')
        this.router.navigate(['/']);
      }, err => {
        this.spinner.hide()
        this.toastr.error('Colud not Logout')
      })
    }
      
  }

  showAboutUs() {
    console.log('About Us clicked');
    // Open your About Us dialog here
    this.dialog.open(AboutUsDialogComponent);
  }

  anotherAction() {
    console.log('Another Action clicked');
    // Implement another action here
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/LoginDTO';
import { SignupDTO } from '../dtos/SignupDTO';
import { VerifyAccountDto } from '../dtos/VerifyAccountDto';
import { FetchMessageDTO } from '../dtos/FetchMessageDTO';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseURL: string = 'https://localhost:44357';

  constructor(private http:HttpClient,private router:Router){}

  Login(input:LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Authantication/SignIn`,input, { headers, responseType: 'text' })
  }

  Register(input:SignupDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Authantication/SignUp`,input, { headers, responseType: 'text' })
  }

  verifyAccount(dto: VerifyAccountDto): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.baseURL, dto, { headers });
  }
  logout(email: string): Observable<any> {
    const url = `${this.baseURL}/api/Authantication/Logout?email=${encodeURIComponent(email)}`;
    const headers = new HttpHeaders({
      'Accept': '*/*'
    });

    return this.http.post<any>(url, null, { headers });
  }

  getWelcomeMessage(userId: number, title: string): Observable<any> {
    const url = `${this.baseURL}/api/Chatbot/GetWelcomeMessage?userId=${userId}&title=${encodeURIComponent(title)}`;
    const headers = new HttpHeaders({
      'Accept': '*/*'
    });

    return this.http.get<any>(url, { headers });
  }

  closeConversation(id: number): Observable<any> {
    const url = `${this.baseURL}/api/Chatbot/ClosedConservation?Id=${id}`;
    const headers = new HttpHeaders({
      'Accept': '*/*'
    });

    return this.http.get<any>(url, { headers });
  }
  executeCommand(text: string, conservationId: number): Observable<any> {
    const url = `${this.baseURL}/api/Chatbot/ExecuteCommand`;
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json'
    });
    const body = {
      text: text,
      conservationId: conservationId
    };

    return this.http.post<any>(url, body, { headers });
  }
  deleteConservation(id: number): Observable<any> {
    const url = `${this.baseURL}/api/Chatbot/DeleteConservation?Id=${id}`;
    const headers = new HttpHeaders({
      'Accept': '*/*'
    });

    return this.http.delete<any>(url, { headers });
  }
  getMessageListByConservationId(conservationId: number): Observable<FetchMessageDTO[]> {
    const url = `${this.baseURL}/api/Message/GetMessageListByConservationId?Id=${conservationId}`;
    return this.http.get<FetchMessageDTO[]>(url);
  }
}

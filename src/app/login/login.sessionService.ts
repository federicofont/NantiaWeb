import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { Session } from '../interfaces/session';

const tokenKey = 'currentToken';


@Injectable()
export class LoginSessionService {

    redirectUrl:string='';
   // private currentToken: string;
   // tokenChanged = new Subject<string>();
   constructor() { }

   isAuthenticated(): boolean {
       return this.getToken() !== null;
   }

   setToken(token: string): void {
       // this.currentToken = token;
       // this.tokenChanged.next(token);
       localStorage.setItem('token', token);
   }

   removeToken(): void {
       // this.currentToken = undefined;
       localStorage.removeItem('token');
   }

   getToken(): string {
       return localStorage.getItem('token');
   }

  // setSession(session: Session) {
  //     localStorage.setItem('token', session.id);
  //     localStorage.setItem('role', session.role);
  // }

   logOff() {
       localStorage.removeItem('token');
    //   localStorage.removeItem('role');
   }
}
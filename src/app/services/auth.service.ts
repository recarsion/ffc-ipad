import {inject, Injectable} from '@angular/core';
import {Auth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false

  constructor(private auth: Auth = inject(Auth)) {
    this.isAuthenticated = !!auth.currentUser
  }
}

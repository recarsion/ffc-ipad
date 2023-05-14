import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../services/modal.service';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";


@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  inSubmission = false

  constructor(
    public modal: ModalService,
    private auth: Auth = inject(Auth)
  ) {
  }

  ngOnInit(): void {
    this.modal.register('auth');
  }

  ngOnDestroy(): void {
    this.modal.unregister('auth');
  }

  async login() {
    this.inSubmission = true

    try {
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      await signInWithEmailAndPassword(
        this.auth,
        email,
        password)
    } catch (e) {
      this.inSubmission = false
      console.error(e);
      return
    }
  }
}

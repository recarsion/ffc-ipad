import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModalComponent, InputComponent],
})
export class SharedModule {}

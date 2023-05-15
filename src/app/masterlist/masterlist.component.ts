import {Component, inject} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {Auth, signOut} from "@angular/fire/auth";

@Component({
  selector: 'app-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.css'],
})
export class MasterlistComponent {
  modalTitle = '';

  constructor(
    public modal: ModalService,
    private auth: Auth = inject(Auth)) {
  }

  addSupplier() {
    this.modalTitle = 'Add Supplier';
    this.modal.toggleModal('supplier');
    console.log('addSupplier called');
  }

  async logout($event: Event) {
    $event.preventDefault()
    await signOut(this.auth)
    location.reload()
  }
}

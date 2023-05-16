import {Component, inject, OnInit} from '@angular/core';
import {ModalService} from '../services/modal.service';
import {Auth, signOut} from "@angular/fire/auth";
import {MasterlistService} from "../services/masterlist.service";
import {DocumentData} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.css'],
})
export class MasterlistComponent implements OnInit {
  modalTitle = '';
  supplierAction = '';
  suppliers: DocumentData[] = [];

  constructor(
    public modal: ModalService,
    private auth: Auth = inject(Auth),
    public masterlistService: MasterlistService) {
  }

  async ngOnInit() {
    await this.masterlistService.fetchData()
    this.suppliers = this.masterlistService.supplierList;
  }

  addSupplier() {
    this.modalTitle = 'Add Supplier';
    this.modal.toggleModal('supplier');
    this.supplierAction = 'isAdd';
  }

  viewSupplier() {
    this.modalTitle = 'Supplier Details';
    this.modal.toggleModal('supplier');
    this.supplierAction = 'isView';
  }

  async logout($event: Event) {
    $event.preventDefault();
    await signOut(this.auth);
    location.reload();
  }
}

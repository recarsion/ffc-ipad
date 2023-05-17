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

  supplierName = ''
  supplierAddress = ''
  supplierNumber = ''
  supplierEmail = ''
  supplierMOP = ''
  supplierItems: any[] = []

  constructor(
    public modal: ModalService,
    private auth: Auth = inject(Auth),
    public masterlistService: MasterlistService) {
  }

  async ngOnInit() {
    await this.masterlistService.fetchData()
  }

  addSupplier() {
    this.modalTitle = 'Add Supplier';
    this.modal.toggleModal('supplier');
    this.supplierAction = 'isAdd';
  }

  viewSupplier(supplier: DocumentData) {
    this.modalTitle = 'Supplier Details';
    this.modal.toggleModal('supplier');
    this.supplierAction = 'isView';

    this.supplierName = supplier.name;
    this.supplierAddress = supplier.address
    this.supplierNumber = supplier.contactNumber
    this.supplierEmail = supplier.contactEmail
    this.supplierMOP = supplier.methodsOfPayment.join(", ")
    this.supplierItems = supplier.items
  }

  async logout($event: Event) {
    $event.preventDefault();
    await signOut(this.auth);
    location.reload();
  }
}

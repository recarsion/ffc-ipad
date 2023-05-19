import { Component, inject, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { DocumentData } from '@angular/fire/compat/firestore';
import { MasterlistService } from '../services/masterlist.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-masterlist',
  templateUrl: './masterlist.component.html',
  styleUrls: ['./masterlist.component.css'],
})
export class MasterlistComponent implements OnInit {
  modalTitle = '';
  supplierAction = '';

  supplierList: DocumentData[] = [];
  searchValue = '';
  selectedOption = 'supplier';

  supplierName = '';
  supplierAddress = '';
  supplierNumber: number = 0;
  supplierEmail = '';
  supplierRating: number = 0;
  supplierMOP = '';
  supplierItems: any[] = [];
  supplierID = '';

  constructor(
    public modal: ModalService,
    private auth: Auth = inject(Auth),
    public masterlistService: MasterlistService
  ) {}

  async ngOnInit() {
    await this.masterlistService.fetchData();
    this.supplierList = this.masterlistService.supplierList;
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
    this.supplierAddress = supplier.address;
    this.supplierNumber = supplier.contactNumber;
    this.supplierEmail = supplier.contactEmail;
    this.supplierRating = supplier.supplierRating;
    this.supplierMOP = supplier.methodsOfPayment.join(', ');
    this.supplierItems = supplier.items;
    this.supplierID = supplier.id;
  }

  search() {
    const searchValue = this.searchValue.toLowerCase();
    this.supplierList = this.masterlistService.supplierList.filter(
      (supplier) => {
        if (this.selectedOption === 'supplier') {
          return supplier.name.toLowerCase().includes(searchValue);
        } else if (this.selectedOption === 'item') {
          return supplier.items.some((item: any) =>
            item.itemName.toLowerCase().includes(searchValue)
          );
        }
        return false;
      }
    );
    console.log(this.selectedOption, this.supplierList);
  }

  async logout($event: Event) {
    $event.preventDefault();
    await signOut(this.auth);
    location.reload();
  }
}
